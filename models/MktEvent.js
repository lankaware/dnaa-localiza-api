// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mktevent = new Schema(
    {
        name: String,
        initialDate: Date,
        finalDate: Date,
        profile: String, 
        address: String,
        city: String,
        state: String,
        zip: String,
        email: String, 
        phone: String,  
    },
    { timestamps: true }
)

mongoose.model("MktEvent", mktevent)