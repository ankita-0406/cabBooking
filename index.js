const express = require("express");
const app = express();
const jwt =  require("jsonwebtoken");

const cors = require('cors');
app.use(cors());

//mongoose
const mongoose = require("mongoose");



//import routes
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const routesPost = require("./routes/routes");
app.use('/', routesPost);



// app.listen(4000, ()=>{
//     mongoose.connect("mongodb://localhost:27017/config");
//     console.log("connected to db");
// })
mongoose.connect("mongodb+srv://ankita:ankitab@rishabt123.gesdw.mongodb.net/testing?retryWrites=true&w=majority", { useNewUrlParser: true } ).then(res=>{
    console.log("Dumb")
    app.listen(3000 , ()=>{
        console.log("Listening")
      
      })
   
});
