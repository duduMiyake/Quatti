const express = require("express")
const cors = require("cors");
const app = express()

require("dotenv").config();
require("./db");

// var bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(cors());

const port = process.env.PORT || 5000;

const pictureRouter = require("./routes/picture");

app.use("/pictures", pictureRouter);

app.listen(port, () => {
    console.log(`O servidor esta rodando na porta ${port}`)
});