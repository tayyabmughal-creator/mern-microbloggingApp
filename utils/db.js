const mongoose = require('mongoose')
require('dotenv').config()

const keys = require('../config/keys');
const { database } = keys;


const connectDB = async () => {
    try {
        console.log('MongoDB connecting...')
        const db = await mongoose.connect(database.url, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log(`MongoDB connected- ${db.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB
