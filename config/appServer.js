const express = require('express')

const cors = require('cors')
const consign = require('consign') 
const fs = require('fs')
const axios = require('axios');
const { Client } = require('whatsapp-web.js');
const SESSION_FILE_PATH = process.env.SESSION_FILE_PATH || '.././session.json'

module.exports = () => {

    let sessionCfg;
    if (fs.existsSync(SESSION_FILE_PATH)) {
        sessionCfg = require(SESSION_FILE_PATH);
    } 

    global.client = new Client({
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--unhandled-rejections=strict'
            ]
        },
        session: sessionCfg
    });

    global.authed = false;

    const app = express()
    app.use(express.json())
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
        res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
        app.use(cors())
        next()
    })



    consign()
        .include('controllers')
        .into(app)

    return app
}


