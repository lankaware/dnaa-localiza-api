// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const application = new Schema(
    {
        respondent_id: mongoose.ObjectId,
        quiz_id: mongoose.ObjectId,
        limitDate: Date,
        responseDate: Date,
        timeSpent: Number,
        returnTimes: Number,
        socialName: String,
        role: String,
        email: String,
        responses: [
            {
                number: Number,
                questions: [
                    {
                        dimension: String,
                        position: Number,
                        value: Number,
                    }
                ]
            }
        ]
    },
    { timestamps: true }
)

mongoose.model("Application", application)