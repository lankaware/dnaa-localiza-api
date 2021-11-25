// import mongoose from 'mongoose';
// import tokenok from "../config/tokenValidate.js"
// import "../models/Quiz.js";
const mongoose = require('mongoose')
const tokenok = require("../config/tokenValidate.js")
require("../models/Application.js")

const ModelName = mongoose.model("Application")
const routeName = "/application"

module.exports = app => {
    
    app.get(routeName + '/:respondent', tokenok, async (req, res) => {
        const respondent_id = mongoose.Types.ObjectId(req.params.respondent)
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'respondents',
                    localField: 'respondent_id',
                    foreignField: '_id',
                    as: 'respondent'
                }
            },
            {
                $lookup:
                {
                    from: 'quizzes',
                    localField: 'quiz_id',
                    foreignField: '_id',
                    as: 'quiz'
                }
            },
            {
                $match: { 'respondent_id': respondent_id },
            },
            {
                $project: {
                    _id: 1,
                    respondent_id: 1,
                    respondent_name: '$respondent.name',
                    quiz_id: 1,
                    quiz_name: '$quiz.name',
                    limitDate: 1,
                    responseDate: 1,
                    timeSpent: 1,
                    returnTimes: 1,
                    socialName: 1,
                    role: 1,
                    email: 1,
                    responses: 1
                },
            },
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

    app.get(routeName + "id/:id", async (req, res) => {
        const _id = mongoose.Types.ObjectId(req.params.id)
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'respondents',
                    localField: 'respondent_id',
                    foreignField: '_id',
                    as: 'respondent'
                }
            },
            {
                $lookup:
                {
                    from: 'quizzes',
                    localField: 'quiz_id',
                    foreignField: '_id',
                    as: 'quiz'
                }
            },
            {
                $match: { '_id': _id }
            },
            {
                $project: {
                    _id: 1,
                    respondent_id: 1,
                    respondent_name: '$respondent.name',
                    quiz_id: 1,
                    quiz_name: '$quiz.name',
                    limitDate: 1,
                    responseDate: 1,
                    timeSpent: 1,
                    returnTimes: 1,
                    socialName: 1,
                    role: 1,
                    email: 1,
                    responses: 1
                },
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
