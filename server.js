var express = require('express');
var bodyparser = require('body-parser');
// var jwtAuth = require("../BasicApp/app/middlewares/authJWT");
require('dotenv').config()

// dotenv package

var cors = require('cors');
// var random = require('random');
var mongoose = require('mongoose');

const path = require('path');

// console.log(__dirname);
// console.log(path.join(__dirname, "./app/config/db.config"));

const dbConfigs = require(path.join(__dirname, "./app/config/db.config"));

console.log(dbConfigs.url)

mongoose.connect(dbConfigs.url);

var app = express();

app.use(bodyparser.json());
app.use(cors());
//app.use(jwtAuth);


var db = mongoose.connection;

db.on("error", () => {
    console.log("Unable to connect to database");
})

db.once('open', () => {
    console.log("Connection successful");
})

require(path.join(__dirname, "./app/Routes/tutorials.routes"))(app);
require(path.join(__dirname, "./app/Routes/users.routes"))(app);

app.listen(process.env.PORT, () => {
    console.log(`Your server is running on port ${process.env.PORT}`);
})

app.get("/", (req, res) => {
    res.json({ message: "Getting started with MVC architecture" })
})



