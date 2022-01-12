// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const emailParms = new Schema(
    {
        emailHost: String,
        emailPort: String,
        emailUser: String,
        emailPass: String,
        emailFromName: String,
        emailFromMail: String,
        emailSubject: String,
        requestText: String,
    },
    { timestamps: true }
)

mongoose.model("EmailParms", emailParms)