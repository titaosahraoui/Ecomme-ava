const product = require("../Models/product");
const ErrorHandler = require("../utilities/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require("../utilities/apiFeatures");

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;
  const {
    name,
    price,
    description,
    ratings,
    images,
    category,
    seller,
    stock,
    numOfReviews,
    reviews,
    user,
    createdAt,
  } = req.body;
  const newproduct = new product({
    name,
    price,
    description,
    ratings,
    images,
    category,
    seller,
    stock,
    numOfReviews,
    reviews,
    user,
    createdAt,
  });
  await newproduct.save().then((createdProduct) => {
    res.status(201).json({
      success: true,
      message: "new product created succesfully",
      createdProduct,
    });
  });
});
// Get all products => api/v1/products
exports.getproduct = catchAsyncErrors(async (req, res, next) => {
  const resperPage = 2;
  const apiFeatures = new APIFeatures(product.find(), req.query)
    .search()
    .filter()
    .pagination(resperPage);

  const productCount = await product.countDocuments();
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
});

// GEt a single product by ID api/v1/product/:_id

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const singleProduct = await product.findById(req.params._id);
  if (!singleProduct) {
    return next(new ErrorHandler("product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "product id 1",
      singleProduct,
    });
  }
});
// UpdateProducts ==> /api/v1/admin/product/:_id

exports.UpdateProduct = catchAsyncErrors(async (req, res, next) => {
  let singleproductUpdate = await product.findById(req.params._id);
  if (!singleproductUpdate) {
    return next(new ErrorHandler("product not found", 404));
  } else {
    singleproductUpdate = await product.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
        runValidator: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      singleproductUpdate,
    });
  }
});

// Delete product  /api/v1/admin/product/:_id

exports.DeleteProduct = catchAsyncErrors(async (req, res, next) => {
  const deleteproduct = await product.findById(req.params._id);
  if (!deleteproduct) {
    return next(new ErrorHandler("product not found", 404));
  } else {
    await deleteproduct.deleteOne();

    res.status(200).json({
      success: true,
      message: `product deleted is ${deleteproduct}`,
    });
  }
});
