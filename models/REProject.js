const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Empreendimento
const reProject = new Schema(
    {
        name: String,
        reDeveloper_id: mongoose.ObjectId,
        addressType: String,
        address: String,
        number: String,
        neighborhood: String, 
        city: String,
        state: String,
        zip: String,
    }
)

mongoose.model("REProject", reProject)
