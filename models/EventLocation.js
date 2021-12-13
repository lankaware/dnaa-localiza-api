// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const eventlocation = new Schema(
    {
        event_id: mongoose.ObjectId,
        location_id: mongoose.ObjectId,
        distance: Number,
        disponibility: String,
        selected: Boolean,
        contracted: Boolean,
    },
    { timestamps: true }
)

mongoose.model("EventLocation", eventlocation)
