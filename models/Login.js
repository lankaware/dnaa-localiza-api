// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const login = new Schema(
    {
        name: String,
        login: String,
        passw: String,
    },
    { timestamps: true }
)

mongoose.model("Login", login)