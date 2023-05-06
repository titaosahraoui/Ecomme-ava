const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const ErrorMiddleware = require("./middleware/errors");

app.use(express.json());
app.use(cookieparser());
// import all product
const products = require("./Routes/product");
const auth = require("./Routes/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);

//  Middleware to handle errors
app.use(ErrorMiddleware);

module.exports = app;
