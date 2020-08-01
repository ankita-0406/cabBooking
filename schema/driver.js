const mongoose= require("mongoose");

const Driver = mongoose.Schema({

name:{
  type:String,
  required: true
},

car:{
    type:String,
    required: true 
  },

  location:{
    type:String,
    required: true 
  },
carType:{
    type:String
    
  }
})

module.exports = mongoose.model("Person", Driver);