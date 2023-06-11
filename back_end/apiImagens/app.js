const express = require("express")
const app = express()

require("dotenv").config();
require("./db");

// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

const port = process.env.PORT || 3000;

const pictureRouter = require("./routes/picture");

app.use("/pictures", pictureRouter);

app.listen(port, () => {
    console.log(`O servidor esta rodando na porta ${port}`)
});

