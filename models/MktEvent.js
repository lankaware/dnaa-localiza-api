// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mktevent = new Schema(
    {
        name: String,
        reproject_id: mongoose.ObjectId,
        date: Date,
        profileFrom: Number, 
        profileTo: Number, 
    },
    { timestamps: true }
)

mongoose.model("MktEvent", mktevent)