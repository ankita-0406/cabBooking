const mongoose =require("mongoose");

const Booking = mongoose.Schema({

    To:{
        type:String,
        required:true
    },
    From:{
    
        type:String,
        required:true
    },
    car:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Person"
        }
    
    })
module.exports = mongoose.model("Book", Booking);