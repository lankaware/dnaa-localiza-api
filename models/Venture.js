const mongoose = require("mongoose")
const Schema = mongoose.Schema

const venture = new Schema(
    {
        name: String,
        tradeName: String,
        email: String, 
        phone: String,
    }
)

mongoose.model("Venture", venture)