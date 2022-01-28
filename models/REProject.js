const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Empreendimento
const reProject = new Schema(
    {
        name: String,
        reDeveloper_id: mongoose.ObjectId,
        address: String,
        neighborhood: String,
        city: String,
        state: String,
        zip: String,
    }
)

mongoose.model("REProject", reProject)
