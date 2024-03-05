import { json } from "express";
import orderModel from "../model/order.js";
import orderItemModel from "../model/orderItem.js";
import productModel from "../model/product.js";
import productDataModel from "../model/productData.js";
import storeModel from "../model/store.js";

/*
 *   @desc   Create new order
 *   @route  POST /api/orders
 *   @access Private
 */
export const addOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      shippingAddress2,
      dateOrdered,
      itemsPrice,
      taxPrice,
      shippingPrice,
      paymentMethod,
    } = req.body;

    const orderItemsData = await Promise.all(
      orderItems.map(async (orderItem) => {
        const newOrderItem = new orderItemModel({
          name: orderItem.name,
          quantity: orderItem.quantity,
          price: orderItem.price,
          product: orderItem.product,
          productData: orderItem.productData,
          storeId: orderItem.storeId, // Change to storeId
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

    const totalPrice =
      totalPrices.reduce((a, b) => a + b, 0) +
      itemsPrice +
      taxPrice +
      shippingPrice;

    const newOrder = await orderModel.create({
      orderItems: orderItemsData.map((orderItem) => orderItem._id),
      shippingAddress: {
        // Change to an object ID
        address: shippingAddress.address,
        city: shippingAddress.city,
        region: shippingAddress.region,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
        phoneNumber: shippingAddress.phoneNumber,
      },
      shippingAddress2,
      status: "Pending",
      totalPrice,
      dateOrdered,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      user: req.user._id, // from token
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

/*
 *   @desc   Get all orders
 *   @route  GET /api/orders
 *   @access Private/Admin
 */
export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user", "id name")
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

/*
 *   @desc   Get order by ID
 *   @route  GET /api/orders/:id
 *   @access Private
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.orderId)
      .populate("user", "name email")
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

/*
 *   @desc   Get logged in users orders
 *   @route  GET /api/orders/myorders
 *   @access Private
 */
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

/*
 *   @desc   Update order to paid
 *   @route  PUT /api/orders/:id/pay
 *   @access Private
 */
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/*
 *   @desc   Update order to delivered
 *   @route  PUT /api/orders/:id/deliver
 *   @access Private/Admin
 */
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

/*
 *   @desc   Update order status
 *   @route  PUT /api/orders/:orderId
 *   @access Private
 */
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

/*
 * @desc: deletes an order associated to order items
 * @route: DELETE  /api/orders/:orderId.
 * @access: Private.
 */
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

// export const addOrder = async (req, res) => {
//   try {
//     const {
//       orderItems,
//       shippingAddress,
//       shippingAddress2,
//       dateOrdered,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//     } = req.body;

//     const orderItemsData = await Promise.all(
//       orderItems.map(async (orderItem) => {
//         const product = await productModel.findById(orderItem.product);
//         const productData = await productDataModel.findById(
//           orderItem.productData
//         );
//         const store = await storeModel.findById(orderItem.storeId);

//         if (!product || !productData || !store) {
//           // Handle the case where product or productData is not found
//           return null;
//         }

//         const newOrderItem = new orderItemModel({
//           name: product.name,
//           quantity: orderItem.quantity,
//           price: totalPrice,
//           product: orderItem.product,
//           productData: orderItem.productData,
//           store: orderItem.storeId,
//         });

//         return newOrderItem.save();
//       })
//     );

//     // Ensure that all orderItems were created successfully
//     if (orderItemsData.includes(null)) {
//       return res
//         .status(400)
//         .json({ msg: "Invalid product or productData in orderItems" });
//     }

//     const totalPrices = await Promise.all(
//       orderItemsData.map(async (orderItem) => {
//         const product = await productModel
//           .findById(orderItem.product)
//           .select("price");
//         const productData = await productDataModel
//           .findById(orderItem.productData)
//           .select("price");

//         if (!product || !productData) {
//           return 0; // Handle the case where product or productData is not found
//         }

//         const totalPrice =
//           (product.price + productData.price) * orderItem.quantity;
//         return totalPrice;
//       })
//     );

//     const totalPrice =
//       totalPrices.reduce((a, b) => a + b, 0) +
//       itemsPrice +
//       taxPrice +
//       shippingPrice;

//     const newOrder = await orderModel.create({
//       orderItems: orderItemsData.map((orderItem) => orderItem._id),
//       orderItems,
//       store: orderItemsData.map((orderItem) => orderItem.store),
//       user: req.user._id, // from token
//       shippingAddress,
//       shippingAddress2,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//       dateOrdered,
//     });

//     res.status(201).json(newOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       msg: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

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
