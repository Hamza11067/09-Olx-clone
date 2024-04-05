const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://hamzakhalid1067:0B7jlP3IIhyn3NRE@cluster0.j4l3sbi.mongodb.net/"
);

const Users = mongoose.model("Users", { username: String, password: String });

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
        const token = jwt.sign(
          { data: result },
          "MY_SECRET_KEY",
          { expiresIn: "1hr" }
        );
        res.send({ message: "User found successfully", token: token });
      } else {
        res.send({ message: "Wrong password" });
      }
    })
    .catch(() => {
      res.send({ message: "server error" });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
