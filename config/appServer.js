// import express, { json } from 'express'
// import cors from 'cors'
const express = require('express')
const cors = require('cors')
const consign = require('consign')

// import login from '../controllers/login.js'
// import quiz from '../controllers/quiz.js'
// import tool from '../controllers/tool.js'
// import dimension from '../controllers/dimension.js'
// const login = require('../controllers/login.js')
// const quiz = require('../controllers/quiz.js')
// const tool = require('../controllers/tool.js')
// const dimension = require('../controllers/dimension.js')

module.exports = () => {
    const app = express()
    app.use(express.json())
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
        res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
        app.use(cors())
        next()
    })

    // login(app)
    // quiz(app)
    // tool(app)
    // dimension(app)
    consign()
    .include('controllers')
    .into(app)

    return app
}


