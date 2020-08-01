const mongoose = require("mongoose");

const Schema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    Booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"


    }]
})
module.exports = mongoose.model("PostSchema", Schema);

