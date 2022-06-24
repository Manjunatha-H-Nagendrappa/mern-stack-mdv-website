require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;
const cookieParser = require("cookie-parser");
const DefaultData = require("./defaultdata");
require("./db/conn");
const router = require("./routes/router");
const products = require("./models/productSchema");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser(""));

app.use(router);

app.use("/images", express.static("images"));

if (process.env.NODE_ENV == "prduction") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

DefaultData();
