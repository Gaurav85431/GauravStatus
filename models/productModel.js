var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },


    mystatus: {
        type: String,

        default: '0'
    }


    // images:{
    //     type: Array,
    //     required: true,
    //     validate: [arrayLimit, "you can pass upto 8 product images"]

    // }
});

// function arrayLimit(val){
//     return val.length <= 8;
// }


module.exports = mongoose.model("product", productSchema);