// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const location = new Schema(
    {
        type: String,
        name: String,
        profile: Number, 
        addressType: String,
        address: String,
        number: String,
        neighborhood: String,
        city: String,
        state: String,
        zip: String,
        email: String, 
        phoneContact: String,
        phone: String,  
        whats: String,
        operatingHours: String,
        capacity: String,
        contactPreference: String,
        photo: String,
        disponibility: String,
        occupied: String,
        dayValue: Number,
        weekendValue: Number,
        fifteenValue: Number,
        monthValue: Number,
        otherValues: String,
        unavailable: String,
        updatedBy: String,
        bankInfo: String,
    },
    { timestamps: true }
)

mongoose.model("Location", location)