const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Incorporadora 
const reDeveloper = new Schema(
    {
        name: String,
        tradeName: String,
        email: String, 
        phone: String,
        fee: Number,
    }
)

mongoose.model("REDeveloper", reDeveloper)
