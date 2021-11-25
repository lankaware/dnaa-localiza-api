// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const respondent = new Schema(
    {
        customer_id: mongoose.ObjectId,
        name: String,
        birthDate: String,
        email: String,
    },
    { timestamps: true }
)

mongoose.model("Respondent", respondent)
