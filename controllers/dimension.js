// import mongoose from 'mongoose';
// import "../models/Dimension.js";
// import tokenok from "../config/tokenValidate.js"
const mongoose = require('mongoose')
require("../models/Dimension.js")
const tokenok = require("../config/tokenValidate.js")

const ModelName = mongoose.model("Dimension")
const routeName = "/dimension"

module.exports = app => {
    app.get(routeName, tokenok, async (req, res) => {
        await ModelName.find()
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

    app.get(routeName + 'tool/:toolid', tokenok, async (req, res) => {
        let searchParm = { 'tool_id':  req.params.toolid }
        await ModelName.find(searchParm)
            .select('_id name acronym')
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

    app.get(routeName + "id/:id", tokenok, async (req, res) => {
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
