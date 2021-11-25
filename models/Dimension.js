// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const dimension = new Schema(
    {
        tool_id: mongoose.ObjectId,
        acronym: String,
        name: String,
    },
    { timestamps: true }
)

mongoose.model("Dimension", dimension)
