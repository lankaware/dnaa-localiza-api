const mongoose = require("mongoose")
const Schema = mongoose.Schema

const venture = new Schema(
    {
        name: String, 
        
    }
)

mongoose.model("Venture", venture)