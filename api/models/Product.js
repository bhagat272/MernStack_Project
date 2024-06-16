const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    ProductName: { type: String, required: true },
    ProductPrice: { type: Number, required: true },
    ProductDesc: { type: String, required: true },
    Stock: { type: String, required: true },
    ProductImage: { type: String, required: true } 
})








module.exports = mongoose.model("ProductTable",ProductSchema)

