const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/olx");

const Users = mongoose.model("Users", { username: String, password: String });

app.get("/", (req, res) => {
  res.send("Hello World! from Hamza");
});

app.get("/signup", (req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;
  const user = new Users({ username: "Hamza", password: "Hamza1067" });
  user.save().then(() => console.log("Save ho gaya"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
