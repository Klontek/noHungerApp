// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await productModel.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Private
export const getProductReviews = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (product) {
      res.status(200).json(product.reviews);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc    Delete product review
// @route   DELETE /api/products/:id/reviews/:reviewId
// @access  Private/Admin
export const deleteProductReview = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (product) {
      const review = product.reviews.find(
        (r) => r._id.toString() === req.params.reviewId.toString()
      );

      if (!review) {
        res.status(404);
        throw new Error("Review not found");
      }

      product.reviews = product.reviews.filter(
        (r) => r._id.toString() !== req.params.reviewId.toString()
      );
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(200).json({ message: "Review deleted" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// @desc    Edit product review
// @route   PUT /api/products/:id/reviews/:reviewId
// @access  Private/Admin
export const editProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await productModel.findById(req.params.id);

    if (product) {
      const review = product.reviews.find(
        (r) => r._id.toString() === req.params.reviewId.toString()
      );

      if (!review) {
        res.status(404);
        throw new Error("Review not found");
      }

      review.rating = Number(rating);
      review.comment = comment;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(200).json({ message: "Review updated" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};
