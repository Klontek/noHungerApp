// import productDataModel from "../model/productData.js";

import productDataModel from "../model/productData.js";

export const getProductDatas = async (req, res) => {
  try {
    const productData = await productDataModel.find();
    res.status(201).json(productData);
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const getproductData = async (req, res) => {
  const productDataId = req.params.productDataId;
  try {
    const productData = await productDataModel.findById(productDataId);
    if (!productData) {
      res
        .status(404)
        .json({ msg: "The productData with the given ID was not found" });
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({
      msg: "Invalid Id parameter",
      success: false,
      value: error,
    });
  }
};

export const addproductData = async (req, res) => {
  try {
    const newProductData = await productDataModel.create({
      name: req.body.name,
      price: req.body.price,
      brand: req.body.brand,
      description: req.body.description,
      countInStock: req.body.countInStock,
      // image: req.body.image,
    });
    res.status(201).json({ msg: "product added", data: newProductData });
    console.log(newProductData);
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const updateProductDatas = async (req, res) => {
  const { name, price, brand, description, countInStock, image } = req.body;
  try {
    await productDataModel.findByIdAndUpdate(
      req.params.productDataId,
      {
        name,
        price,
        brand,
        description,
        countInStock,
        image,
      },
      {
        new: true,
      }
    );

    res.status(200).json("productData has been updated successfully!");
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

export const deleteProductData = async (req, res) => {
  try {
    let productData = (await productDataModel.findById(
      req.params.productDataId
    )(!productData))
      ? res.status(404).json({ msg: "productData not found" })
      : await productData.remove();
    res.status(201).json("productData has been deleted successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
