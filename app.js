// import dbconnect from './config/dbConnection.js'
// import server from './config/appServer.js'
const dbconnect = require('./config/dbConnection.js')
const server = require('./config/appServer.js')

dbconnect()
const app = server()
app.listen(8090, function () {
    console.log("Servidor DNAA-Localiza iniciado na porta 8090")
})


