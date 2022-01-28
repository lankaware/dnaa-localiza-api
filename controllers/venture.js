const mongoose = require('mongoose')
const tokenok = require("../config/tokenValidate.js")
require("../models/EventLocation.js")

const ModelName = mongoose.model("EventLocation")
const routeName = "/eventlocation"