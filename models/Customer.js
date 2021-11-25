// import mongoose from "mongoose"
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const customer = new Schema(
    {
        name: String, //
        cpf: String, //
        cnpj: String,
        legalName: String,
        email: String, //
        phone: String, // 
        personType: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        active: Boolean,
        registerDate: Date,
    },
    { timestamps: true }
)

mongoose.model("Customer", customer)