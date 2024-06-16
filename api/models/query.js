const mongoose = require("mongoose")

const QuerySchema = mongoose.Schema({
    email:String,
    query:String
})








module.exports = mongoose.model("QueryTable",QuerySchema)

