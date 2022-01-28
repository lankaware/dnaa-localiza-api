const mongoose = require('mongoose')
const tokenok = require("../config/tokenValidate.js")
require("../models/EventLocation.js")

const ModelName = mongoose.model("EventLocation")
const routeName = "/eventlocation"

module.exports = app => {

    app.get(routeName + "id/:id", async (req, res) => {
        const _id = mongoose.Types.ObjectId(req.params.id)
        await ModelName.findById(req.params.id)
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })
 
    app.get(routeName + "event/:id", async (req, res) => {
        const _id = mongoose.Types.ObjectId(req.params.id)
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'locations',
                    localField: 'location_id',
                    foreignField: '_id',
                    as: 'location'
                }
            },
            {
                $match: { 'event_id': _id }
            },
           {
                $project:
                {
                    _id: 1,
                    event_id: 1,
                    location_id: 1,
                    location_profile: '$location.profile',
                    location_name: '$location.name',
                    location_address: '$location.address',
                    location_zip: '$location.zip',
                    location_city: '$location.city',
                    distance: 1,
                    disponibility: 1,
                    selected: 1,
                }
            },
            {
                $sort: { 'date': 1 },
            }
        ])
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.post(routeName, tokenok, async (req, res) => {
        await ModelName.create(req.body)
            .then((record) => {
                return res.json({
                    error: false,
                    record,
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
    })

    app.put(routeName + "id/:id", tokenok, async (req, res) => {
        await ModelName.updateOne({ _id: req.params.id }, req.body)
            .then((record) => {
                return res.json({
                    error: false,
                    record,
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
    })

    app.put(routeName, tokenok, async (req, res) => {
        await ModelName.find(req.body)
            .then((record) => {
                return res.json({
                    error: false,
                    record,
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.delete(routeName + "id/:id", tokenok, async (req, res) => {
        await ModelName.deleteOne({ _id: req.params.id })
            .then(_ => {
                return res.json({
                    error: false,
                    message: "Registro removido.",
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
    })
}
