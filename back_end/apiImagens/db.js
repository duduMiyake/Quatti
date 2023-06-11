const mongoose = require("mongoose")

require("dotenv").config()

mongoose.set("strictQuery", true)

async function main() {
    const databaseUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.nyfre0p.mongodb.net/quatti?retryWrites=true&w=majority`;
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Conectado com sucesso");
}

main().catch((err) => console.log(err));

module.exports = main;
