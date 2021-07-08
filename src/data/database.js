require("dotenv").config()
const mongoose = require("mongoose")

const connect = () => {
    mongoose.connect(process.env.MONGO_URI_PROD, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(console.log("Mongo DB conectado")).catch(err => console.err)
}

module.exports = {connect}
