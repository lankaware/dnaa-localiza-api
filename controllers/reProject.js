const mongoose = require('mongoose')
const tokenok = require("../config/tokenValidate.js")
require("../models/REProject.js")

const ModelName = mongoose.model("REProject")
const routeName = "/reproject"

module.exports = app => {
    app.get(routeName, tokenok, async (req, res) => {
        // await ModelName.find()
        await ModelName.aggregate([
            {
                $project:
                {
                    _id: 1,
                    name: 1,
                    reDeveloper_id: 1,
                    addressType: 1,
                    address: 1,
                    number: 1,
                    fulladdress: { $concat: ['$addressType', ' ', '$address', ', ', '$number'] },
                    neighborhood: 1,
                    city: 1,
                    state: 1,
                    zip: 1,
                }
            },
            {
                $sort: { 'name': 1 },
            },
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
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.get(routeName + "id/:id", async (req, res) => {
        const _id = mongoose.Types.ObjectId(req.params.id)
        // await ModelName.findById(req.params.id)
        await ModelName.aggregate([
            {
                $project:
                {
                    _id: 1,
                    name: 1,
                    reDeveloper_id: 1,
                    addressType: 1,
                    address: 1,
                    number: 1,
                    fulladdress: { $concat: ['$addressType', ' ', '$address', ', ', '$number'] },
                    neighborhood: 1,
                    city: 1,
                    state: 1,
                    zip: 1,
                }
            },
            {
                $sort: { 'name': 1 },
            },
            {
                $match: { '_id': _id },
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

    app.get(routeName + "perdeveloper/:developer", async (req, res) => {
        const developer = mongoose.Types.ObjectId(req.params.developer)
        await ModelName.find({ "reDeveloper_id": developer }, '_id name address')
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
