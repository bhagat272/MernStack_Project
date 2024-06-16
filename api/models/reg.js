const mongoose = require("mongoose")

const regSchema = mongoose.Schema({
    userName:String,
    password:String,
    regdate:{type: Date,
    default: Date.now},
    status :{
        type:String,
        default:"Active"
    }
})








module.exports = mongoose.model("Reg",regSchema)

