// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tool = new Schema(
    {
        name: String,
    },
    { timestamps: true }
)

mongoose.model("Tool", tool)
