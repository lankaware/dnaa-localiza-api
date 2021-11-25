// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const quiz = new Schema(
    {
        name: String,
        active: Boolean,
        blockLimit: Number,
        questionLimit: Number,
        tool_id: mongoose.ObjectId,
        blocks: [
            {
                number: Number,
                observation: String,
                questions: [
                    {
                        dimension: String,
                        text: String,
                    }
                ]
            }
        ]
    },
    { timestamps: true }
)

mongoose.model("Quiz", quiz)
