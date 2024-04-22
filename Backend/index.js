const express = require("express");
const app = express();
const port = 3000;

// path for file uploads
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// cors
const cors = require("cors");
app.use(cors());

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// json web token
const jwt = require("jsonwebtoken");

// multer for files uploads
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// mongoose for mongodb
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://hamzakhalid1067:0B7jlP3IIhyn3NRE@cluster0.j4l3sbi.mongodb.net/"
);

// Mongodb models for data storage
const Users = mongoose.model("Users", {
  username: String,
  password: String,
  mobile: String,
  email: String,
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

const Products = mongoose.model("Products", {
  pname: String,
  pdesc: String,
  price: Number,
  pcategory: String,
  pimage: String,
  addedBy: mongoose.Schema.Types.ObjectId,
});

app.get("/", (req, res) => {
  res.send("Hello World! from Hamza");
});

// for search results
app.get("/search", (req, res) => {
  let search = req.query.search;

  Products.find({
    $or: [
      { pname: { $regex: search } },
      { pdesc: { $regex: search } },
      { pcategory: { $regex: search } },
    ],
  })
    .then((results) => {
      res.send({ message: "success", products: results });
    })
    .catch(() => {
      res.send({ message: "failed" });
    });
});

// to save liked products data
app.post("/like-product", (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;
  // console.log(req.body);

  Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
    .then(() => {
      res.send({ message: "liked successfully" });
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

app.post("/dislike-product", (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;

  Users.updateOne({ _id: userId }, { $pull: { likedProducts: productId } })
    .then(() => {
      res.send({ message: "Disliked successfully" });
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

app.post("/delete-product", (req, res) => {
  let productId = req.body.productId;
  let userId = req.body.userId;
  console.log(productId, userId);

  Products.findOne({ _id: productId })
    .then((result) => {
      if (result.addedBy == userId) {
        Products.deleteOne({ _id: productId }).then((deleteResult) => {
          if (deleteResult.acknowledged) {
            res.send({ message: "success" });
          }
          // res.send({ message: "Disliked successfully" });
        });
      }
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

// to show liked products on frontend
app.post("/liked-products", (req, res) => {
  Users.findOne({ _id: req.body.userId })
    .populate("likedProducts")
    .then((result) => {
      res.send({ message: "success", products: result.likedProducts });
    })
    .catch(() => {
      res.send({ message: "request failed" });
    });
});

app.post("/my-products", (req, res) => {
  Products.find({ addedBy: req.body.userId })
    .then((result) => {
      res.send({ message: "success", products: result });
    })
    .catch(() => {
      res.send({ message: "request failed" });
    });
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const mobile = req.body.mobile;
  const email = req.body.email;

  const user = new Users({
    username,
    password,
    mobile,
    email,
  });
  user
    .save()
    .then(() => {
      res.send({ message: "User saved successfully" });
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // finding user for login
  Users.findOne({ username: username })
    .then((result) => {
      if (!result) {
        res.send({ message: "User not found" });
      } else if (result.password == password) {
        const token = jwt.sign({ data: result }, "MY_SECRET_KEY", {
          expiresIn: "1hr",
        });
        res.send({
          message: "User found successfully",
          token: token,
          userId: result._id,
        });
      } else {
        res.send({ message: "Wrong password" });
      }
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

// Add product section
app.post("/add-product", upload.single("pimage"), (req, res) => {
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const pcategory = req.body.pcategory;
  const pimage = req.file.path;
  const addedBy = req.body.userId;

  const product = new Products({
    pname,
    pdesc,
    price,
    pcategory,
    pimage,
    addedBy,
  });
  product
    .save()
    .then(() => {
      res.send({ message: "saved successfully" });
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

app.post("/edit-product", upload.single("pimage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const pcategory = req.body.pcategory;
  const pimage = req.file.path;
  const addedBy = req.body.userId;
  const productId = req.body.productId;

  let editObj = {};

  if (pname) {
    editObj.pname = pname;
  }
  if (pdesc) {
    editObj.pdesc = pdesc;
  }
  if (price) {
    editObj.price = price;
  }
  if (pcategory) {
    editObj.pcategory = pcategory;
  }
  if (pimage) {
    editObj.pimage = pimage;
  }
  
  Products.updateOne({ _id: productId}, editObj, { new: true})
    .then((result) => {
      res.send({ message: "saved successfully" });
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

// to show all product on frontend
app.get("/get-products", (req, res) => {
  const categoryName = req.query.categoryName;
  let _f = {};

  if (categoryName) {
    _f = { pcategory: categoryName };
  }

  Products.find(_f)
    .then((result) => {
      res.send({ message: "success", products: result });
    })
    .catch(() => {
      res.send({ message: "failed" });
    });
});

// for single product details
app.get("/get-product/:productId", (req, res) => {
  // console.log(req.params);

  Products.findOne({ _id: req.params.productId })
    .then((result) => {
      res.send({ message: "success", product: result });
    })
    .catch(() => {
      res.send({ message: "failed" });
    });
});

app.get("/my-profile/:userId", (req, res) => {
  const userId = req.params.userId;

  Users.findOne({ _id: userId })
    .then((result) => {
      res.send({
        message: "success",
        user: {
          username: result.username,
          mobile: result.mobile,
          email: result.email,
        },
      });
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

// to show user contact details
app.get("/get-user/:addedBy", (req, res) => {
  const _userId = req.params.addedBy;

  Users.findOne({ _id: _userId })
    .then((result) => {
      res.send({
        message: "success",
        user: {
          username: result.username,
          mobile: result.mobile,
          email: result.email,
        },
      });
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
