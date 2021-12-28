const tokenok = require("../config/tokenValidate.js")

module.exports = app => {

    app.post('/sendmessage/:phone', tokenok, async (req, res) => {
        let phone = req.params.phone;
        let message = req.body.message;

        if (phone == undefined || message == undefined) {
            res.send({ status: "error", message: "please enter valid phone and message" })
        } else {
            client.sendMessage(phone + '@c.us', message)
                .then((response) => {
                    if (response.id.fromMe) {
                        res.send({ status: 'success', message: `Message successfully sent to ${phone}` })
                    }
                });
        }
    });
}