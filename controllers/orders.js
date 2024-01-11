import { json } from "express";
import orderModel from "../model/order.js";
import orderItemModel from "../model/orderItem.js";
import productModel from "../model/product.js";
import productDataModel from "../model/productData.js";

// export const addOrder = async (req, res) => {
//   try {
//     const {
//       orderItems,
//       shippingAddress1,
//       shippingAddress2,
//       city,
//       zip,
//       country,
//       phone,
//       status,
//       user,
//       dateOrdered,
//     } = req.body;

//     const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
//       let newOrderItem = new orderItemModel({
//         quantity: orderItem.quantity,
//         product: orderItem.product
//       })

//     newOrderItem = await newOrderItem.save();

//     return newOrderItem._id
//     }))

//     const orderItemsIdsResolved = await orderItemsIds;

//     const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
//   const orderItem = await orderItemModel
//     .findById(orderItemId)
//     .populate("product", "price");

//   if (!orderItem) {
//     return 0; // Handle the case where orderItem is not found
//   }

//   const totalPrice = orderItem.product.price * orderItem.quantity;
//   return totalPrice;
//     }));

//   const totalPrice = totalPrices.reduce((a, b) => a + b, 0)

//     console.log(totalPrices)

//     const newOrder = await orderModel.create({
//       orderItems: orderItemsIdsResolved,
//       shippingAddress1,
//       shippingAddress2,
//       city,
//       zip,
//       country,
//       phone,
//       status,
//       totalPrice: totalPrice,
//       user,
//       dateOrdered,
//     });

//     res.status(201).json(newOrder);
//   } catch (error) {
//     res.status(500).json({
//       msg: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

export const addOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      user,
      dateOrdered,
    } = req.body;

    const orderItemsData = await Promise.all(
      orderItems.map(async (orderItem) => {
        const product = await productModel.findById(orderItem.product);
        const productData = await productDataModel.findById(
          orderItem.productData
        );

        if (!product || !productData) {
          // Handle the case where product or productData is not found
          return null;
        }

        const newOrderItem = new orderItemModel({
          quantity: orderItem.quantity,
          product: orderItem.product,
          productData: orderItem.productData,
        });

        return newOrderItem.save();
      })
    );

    // Ensure that all orderItems were created successfully
    if (orderItemsData.includes(null)) {
      return res
        .status(400)
        .json({ msg: "Invalid product or productData in orderItems" });
    }

    const totalPrices = await Promise.all(
      orderItemsData.map(async (orderItem) => {
        const product = await productModel
          .findById(orderItem.product)
          .select("price");
        const productData = await productDataModel
          .findById(orderItem.productData)
          .select("price");

        if (!product || !productData) {
          return 0; // Handle the case where product or productData is not found
        }

        const totalPrice =
          (product.price + productData.price) * orderItem.quantity;
        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    const newOrder = await orderModel.create({
      orderItems: orderItemsData.map((orderItem) => orderItem._id),
      shippingAddress1,
      shippingAddress2,
      city,
      zip,
      country,
      phone,
      status,
      totalPrice,
      user,
      dateOrdered,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ msg: "Orders not found" });
    }

    res.status(200).json({ data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.orderId)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      });

    if (!order || order === 0) {
      return res.status(404).json({ msg: "No available orders found!" });
    }

    res.status(200).json({ data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getTotalSales = async (req, res) => {
  try {
    const totalSales = await orderModel.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);

    if (!totalSales || totalSales.length === 0) {
      return res
        .status(404)
        .json({ msg: "The total order sales cannot be generated" });
    }

    return res.status(200).json({ totalSales: totalSales[0].totalSales });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getOrderCount = async (req, res) => {
  try {
    const countOrder = await orderModel.countDocuments();

    if (!countOrder) {
      return res.status(404).json("No available order");
    }
    res.status(200).json({ count: countOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userOrderList = await orderModel
      .find({ user: userId })
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          populate: "category",
        },
      });

    if (!userOrderList || userOrderList.length === 0) {
      return res.status(404).json({
        success: false,
        msg: "User has no available orders",
      });
    }

    return res.status(200).json({ data: userOrderList });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const orderUpdate = await orderModel.findByIdAndUpdate(
      req.params.orderId,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!orderUpdate) {
      return res.status(404).json({ msg: "order cannot be update" });
    }

    return res.status(200).json({ data: orderUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderModel.findByIdAndRemove(req.params.orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        msg: "Can not delete Order",
      });
    }

    // Remove associated orderItems
    await Promise.all(
      deletedOrder.orderItems.map(async (orderItem) => {
        await orderItemModel.findByIdAndRemove(orderItem);
      })
    );

    res.status(200).json({
      success: true,
      msg: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};
