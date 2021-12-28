const express = require('express')
const qrcode = require('qrcode-terminal');

const cors = require('cors')
const consign = require('consign') 
const fs = require('fs');
const axios = require('axios');
const { Client } = require('whatsapp-web.js');
const SESSION_FILE_PATH = process.env.SESSION_FILE_PATH || '.././session.json';

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

    client.on('qr', qr => {
        fs.writeFileSync('./auth/last.qr', qr);
        qrcode.generate(qr, {small: true});

    });

    client.on('authenticated', (session) => {
        console.log("AUTH!");
        sessionCfg = session;

        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.error(err);
            }
            authed = true;
        });

        try {
            fs.unlinkSync('./auth/last.qr')
        } catch (err) { }
    });

    client.on('auth_failure', () => {
        console.log("AUTH Failed !")
        sessionCfg = ""
        process.exit()
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.on('message', async msg => {
        if (config.webhook.enabled) {
            if (msg.hasMedia) {
                const attachmentData = await msg.downloadMedia()
                msg.attachmentData = attachmentData
            }
            axios.post(config.webhook.path, { msg })
        }
    })
    client.initialize();


    consign()
        .include('controllers')
        .into(app)

    return app
}


