// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const location = new Schema(
    {
        name: String,
        profile: Number, 
        address: String,
        neighborhood: String,
        city: String,
        state: String,
        zip: String,
        email: String, 
        phone: String,  
        contactPreference: String,
        photo: String,
        disponibility: String,
    },
    { timestamps: true }
)

mongoose.model("Location", location)