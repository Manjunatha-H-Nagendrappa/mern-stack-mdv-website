const productdata = require("./rawdata/productData");
const Products = require("./models/productSchema");

const DefaultData = async () => {
  try {
    await Products.deleteMany({});
    const storeData = await Products.insertMany(productdata);
    console.log(storeData);
  } catch (error) {
    console.log("Default data error", +error.message);
  }
};

module.exports = DefaultData;
