// const Store = require("../models/store");
// const cloudinary = require("cloudinary").v2;
// const Order = require("../models/order");
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const getMyStore = async (req, res) => {
  try {
    const store = await storeModel.findOne({ user: req.userId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json(store);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching store" });
  }
};

const getStore = async (req, res) => {
  try {
    const storeId = req.params.storeId;

    const store = await storeModel.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(store);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createMyStore = async (req, res) => {
  try {
    const existingStore = await storeModel.findOne({ user: req.userId });

    if (existingStore) {
      return res.status(409).json({ message: "User store already exists" });
    }

    const imageUrl = await uploadImage(req.file);

    const store = new storeModel(req.body);
    store.imageUrl = imageUrl;
    store.user = new mongoose.Types.ObjectId(req.userId);
    store.lastUpdated = new Date();

    const newStore = await store.save();
    if (!newStore) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.status(201).json(store);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateMyStore = async (req, res) => {
  try {
    const store = await storeModel.findOne({
      user: req.userId,
    });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    store.storeName = req.body.storeName;
    store.city = req.body.city;
    store.country = req.body.country;
    store.deliveryPrice = req.body.deliveryPrice;
    store.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    store.cuisines = req.body.cuisines;
    store.menuItems = req.body.menuItems;
    store.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file);
      store.imageUrl = imageUrl;
    }

    await store.save();
    res.status(200).json(store);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyStoreOrders = async (req, res) => {
  try {
    const store = await storeModel.findOne({ user: req.userId });
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const orders = await orderModel
      .find({ store: store._id })
      .populate("store")
      .populate("user");

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const store = await storeModel.findById(order.store);

    if (store?.user?._id.toString() !== req.userId) {
      return res.status(401).send();
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to update order status" });
  }
};

const uploadImage = async (file) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.uploader.upload(dataURI);
  return uploadResponse.url;
};

const searchStore = async (req, res) => {
  try {
    const city = req.params.city;

    const searchQuery = req.query.searchQuery || "";
    const selectedCuisines = req.query.selectedCuisines || "";
    const sortOption = req.query.sortOption || "lastUpdated";
    const page = parseInt(req.query.page) || 1;

    let query = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await storeModel.countDocuments(query);
    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { storeName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // sortOption = "lastUpdated"
    const stores = await storeModel
      .find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Store.countDocuments(query);

    const response = {
      data: stores,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  updateOrderStatus,
  getMyStoreOrders,
  getMyStore,
  createMyStore,
  updateMyStore,
  searchStore,
  getStore,
};
