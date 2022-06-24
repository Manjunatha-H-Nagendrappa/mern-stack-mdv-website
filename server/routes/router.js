const express = require("express");
const router = new express.Router();
const products = require("../models/productSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate");

router.get("/getproducts", async (req, res) => {
  try {
    const productsInfo = await products.find();
    res.status(201).json(productsInfo);
  } catch (error) {
    console.log("products data error" + error.message);
  }
});

router.get("/getproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productInfo = await products.findOne({ id: id });
    res.status(201).json(productInfo);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  const { fname, email, mobile, password, cpassword } = req.body;
  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" });
  }

  try {
    const preuser = await User.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "Email already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Password not matching" });
    } else {
      const finaluser = new User({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      const storedata = await finaluser.save();
      console.log(storedata + "User added successfully");
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log("Registration error" + error.message);
    res.status(422).send(error);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill the details" });
  }

  try {
    const userlogin = await User.findOne({ email: email });
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        const token = await userlogin.generateAuthToken();
        res.cookie("Mydreamvehicle", token, {
          expires: new Date(Date.now() + 2589000),
          httpOnly: true,
        });
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "User not exit" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid credentials" });
    console.log("Login error", error.message);
  }
});

router.post("/addorder/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await products.findOne({ id: id });
    const Usercontact = await User.findOne({ _id: req.userID });
    if (Usercontact) {
      const orderData = await Usercontact.addOrdersData(order);

      await Usercontact.save();
      res.status(201).json(Usercontact);
    }
  } catch (error) {
    console.log("Add order error", error.message);
  }
});

router.get("/orderdetails", authenicate, async (req, res) => {
  try {
    const buyuser = await User.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    console.log(error + "error for buy now");
  }
});

//It gives error before login, You need to login with right credentials to become valid user
router.get("/validuser", authenicate, async (req, res) => {
  try {
    const validuserone = await User.findOne({ _id: req.userID });
    res.status(201).json(validuserone);
  } catch (error) {
    console.log(error + "Valid user error");
  }
});

router.get("/remove/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.orders = req.rootUser.orders.filter((del) => {
      return del.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
  } catch (error) {
    console.log(error + "Delete error");
    res.status(400).json(error);
  }
});

router.get("/logout", authenicate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((out) => {
      return out.token !== req.token;
    });
    res.clearCookie("Mydreamvehicle", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
  } catch (error) {
    console.log(error + "Logout error");
  }
});

module.exports = router;
