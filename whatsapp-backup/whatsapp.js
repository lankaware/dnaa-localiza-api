const tokenok = require("../config/tokenValidate.js")
const fs = require('fs')
const SESSION_FILE_PATH = process.env.SESSION_FILE_PATH || '.././session.json'
const qrcode = require('qrcode-terminal');

module.exports = app => {

    app.post('/sendmessage/:phone', tokenok, async (req, res) => {
        let phone = req.params.phone;
        let message = req.body.message;

        if (phone == undefined || message == undefined) {
            // res.send({ status: "error", message: "please enter valid phone and message" })
            return res.json({
                status: "error", message: "please enter valid phone and message"
            })

        } else {
            client.sendMessage(phone + '@c.us', message)
                .then((response) => {
                    if (response.id.fromMe) {
                        // res.send({ status: 'success', message: `Message successfully sent to ${phone}` })
                        return res.json({
                            status: 'success', message: `Message successfully sent to ${phone}`
                        })
                    }
                })
                .catch((err) => {
                    return res.json({
                        error: true,
                        err: err,
                        phone,
                        message,
                    })
                })
        }
    });

    app.post('/setupmessage', tokenok, async (req, res) => {

        client.on('qr', qr => {
            console.log('1')
            fs.writeFileSync('./auth/last.qr', qr);
            console.log('2')
            qrcode.generate(qr, { small: true });
            return res.json({
                error: false,
                qr
            })
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
            } catch (err) {
                return res.json({
                    error: true,
                    message: '1',
                    err
                })

            }
        })

        client.on('auth_failure', () => {
            console.log("AUTH Failed !")
            sessionCfg = ""
            process.exit()
        })

        client.on('ready', () => {
            console.log('Client is ready!');
        })

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
        
    });


}