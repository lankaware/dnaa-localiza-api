const mongoose = require('mongoose')
const axios = require('axios')

const tokenok = require("../config/tokenValidate.js")
require("../models/Location.js")
require("../models/MktEvent.js")
require("../models/EventLocation.js")


const ModelName = mongoose.model("Location")
const routeName = "/location"



const MktEventModelName = mongoose.model("MktEvent")
const EventLocationModelName = mongoose.model("EventLocation")


module.exports = app => {

    app.get(routeName + "distance/:origin/:destination", tokenok, async (req, res) => {
        // Atenção: quando possível verificar se realmente é necessário usar o axios, ou se ele pode ser útil para outras funções

        const localOrigin = encodeURI(req.params.origin)
        const localDest = encodeURI(req.params.destination)
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${localOrigin}&destinations=${localDest}&key=${process.env.GDIST_KEY}`
        const config = {
            method: 'get',
            url: url,
            headers: {}
        };

        var distance = 0

        await axios(config)
            .then(function (response) {
                distance = response.data.rows[0].elements[0].distance.value
                return res.json({
                    distance: (distance / 1000).toFixed(1)
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.get(routeName, tokenok, async (req, res) => {
        // await ModelName.find()
        //     .sort('name')
        await ModelName.aggregate([
            {
                $project:
                {
                    type: 1,
                    name: 1,
                    profile: 1,
                    addressType: 1,
                    address: 1,
                    number: 1,
                    fulladdress: {$concat: ['$addressType', ' ', '$address', ', ', '$number']},
                    neighborhood: 1,
                    city: 1,
                    state: 1,
                    zip: 1,
                    email: 1,
                    phoneContact: 1,
                    phone: 1,
                    whats: 1,
                    operatingHours: 1,
                    capacity: 1,
                    contactPreference: 1,
                    photo: 1,
                    disponibility: 1,
                    occupied: 1,
                    dayValue: 1,
                    weekendValue: 1,
                    fifteenValue: 1,
                    monthValue: 1,
                    unavailable: 1,
                    updatedBy: 1,
                }
            },
            {
                $sort: { 'name': 1 },
            }
        ])
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.get(routeName + "name/:name", tokenok, async (req, res) => {
        let searchParm = { '$and': [{ 'name': { '$gte': req.params.name } }, { 'name': { '$lte': req.params.name + '~' } }] }
        await ModelName.find(searchParm)
            .select('_id name')
            .sort('name')
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

    // let searchHistory = async (location) => {
    //     let record = [];
    //    await EventLocationModelName.find({ 'location_id': req.params.id }, 'event_id')
    //    .then((history) => {
    //        for(let result of history) {
    //             await MktEventModelName.find({ '_id': result.event_id })
    //             .then((result) => {
    //                 record.push(result)
    //             })
    //        }
    //    })
    // }

    app.get(routeName + "id/:id", async (req, res) => {
        Promise.all([
            ModelName.findById(req.params.id),
            // searchHistory(req.params.id)
            // EventLocationModelName.find({ 'location_id': req.params.id }, 'event_id')
        ]).then(([record, history]) => {
            return res.json({
                error: false,
                history: history,
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
        let searchParm = { 'name': req.body.name }
        await ModelName.find(searchParm)
            .then((result) => {
                if (result == []) {
                    return err;
                } else {
                    ModelName.create(req.body)
                        .then((record) => {
                            return res.json({
                                error: false,
                                record,
                            })
                        })
                }
            }).catch((err) => {
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
        // await ModelName.find(req.body)
        await ModelName.aggregate([
            {
                $match: req.body
            },
            {
                $project:
                {
                    type: 1,
                    name: 1,
                    profile: 1,
                    addressType: 1,
                    address: 1,
                    number: 1,
                    fulladdress: {$concat: ['$addressType', ' ', '$address', ', ', '$number']},
                    neighborhood: 1,
                    city: 1,
                    state: 1,
                    zip: 1,
                    email: 1,
                    phoneContact: 1,
                    phone: 1,
                    whats: 1,
                    operatingHours: 1,
                    capacity: 1,
                    contactPreference: 1,
                    photo: 1,
                    disponibility: 1,
                    occupied: 1,
                    dayValue: 1,
                    weekendValue: 1,
                    fifteenValue: 1,
                    monthValue: 1,
                    unavailable: 1,
                    updatedBy: 1,
                }
            },
            {
                $sort: { 'name': 1 },
            }
        ])
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
