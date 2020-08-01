const mongoose= require("mongoose");

const Driver = mongoose.Schema({

name:{
  type:String,
  required: true
},

 location:{
    type:String,
    required: true 
  },
car:{
    type:String
    
  },
//   user:{

// type:mongoose.Schema.Types.ObjectId,
// ref:"PostSchema"

//   }
})

module.exports = mongoose.model("Person", Driver);