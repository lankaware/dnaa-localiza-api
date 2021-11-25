// import mongoose from 'mongoose';
// import tokenok from "../config/tokenValidate.js"
// import "../models/Quiz.js";
const mongoose = require('mongoose')
const tokenok = require("../config/tokenValidate.js")
require("../models/Quiz.js")

const ModelName = mongoose.model("Quiz")
const routeName = "/quiz"

module.exports = app => {
    app.get(routeName, tokenok, async (req, res) => {
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'tools',
                    localField: 'tool_id',
                    foreignField: '_id',
                    as: 'tool'
                }
            },
            {
                $lookup:
                {
                    from: 'dimensions',
                    localField: 'blocks.questions.dimension_id',
                    foreignField: '_id',
                    as: 'dimension'
                }
            },
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    active: '$active',
                    blockLimit: '$blockLimit',
                    questionLimit: '$questionLimit',
                    tool_id: '$tool_id',
                    tool_name: '$tool.name',
                    blocks: // 1
                        {
                            number: 1,
                            questions: // 1,
                            {
                                dimension: 1, 
                                text: 1,
                            }
                        }
                },
            },
            {
                $sort: { 'name': 1 },
            }
        ])
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

    app.get(routeName + "id/:id", async (req, res) => {
        const _id = mongoose.Types.ObjectId(req.params.id)
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'tools',
                    localField: 'tool_id',
                    foreignField: '_id',
                    as: 'tool'
                },
            },
            {
                $match: { '_id': _id }
            },
            {
                $project:
                {
                    _id: 1,
                    name: 1,
                    active: 1,
                    blockLimit: 1,
                    questionLimit: 1,
                    tool_id: 1,
                    tool_name: '$tool.name',
                    blocks: 1,
                }
            },
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
