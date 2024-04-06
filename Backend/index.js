const express = require("express");
const app = express();
const port = 3000;

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

const Users = mongoose.model("Users", { username: String, password: String });
const Products = mongoose.model("Products", {
  pname: String,
  pdesc: String,
  price: Number,
  pcategory: String,
  pimage: String,
});

app.get("/", (req, res) => {
  res.send("Hello World! from Hamza");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = new Users({ username: username, password: password });
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
      console.log(result, "user data");
      if (!result) {
        res.send({ message: "User not found" });
      } else if (result.password == password) {
        const token = jwt.sign({ data: result }, "MY_SECRET_KEY", {
          expiresIn: "1hr",
        });
        res.send({ message: "User found successfully", token: token });
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
  console.log(req.body);
  console.log(req.file.path);
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const pcategory = req.body.pcategory;
  const pimage = req.file.path;

  const product = new Products({ pname, pdesc, price, pcategory, pimage });
  product
    .save()
    .then(() => {
      res.send({ message: "saved successfully" });
    })
    .catch(() => {
      res.send({ message: "server error" });
    });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
