const express = require("express");
const app = express();
const jwt =  require("jsonwebtoken");

const cors = require('cors');
app.use(cors());

//mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/config", { useNewUrlParser: true } );

//import routes
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const routesPost = require("./routes/routes");
app.use('/', routesPost);


app.listen(27017);
// app.listen(4000, ()=>{
//     mongoose.connect("mongodb://localhost:27017/config");
//     console.log("connected to db");
// })