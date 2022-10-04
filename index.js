const express = require('express')
// require('dotenv').config({ path: './config.env' })
require('dotenv').config()
// const cors = require('cors')
const morgan = require('morgan')
// const passport = require('passport')
const connectDB = require('./utils/db')
const path = require('path');

const keys = require('./config/keys');
const { port } = keys;

const app = express()


// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

//database
connectDB()

// require('./config/passport')(passport);
// app.use(passport.initialize());

//routes
app.use('/', require('./routes/userRoutes'))

// let port = process.env.PORT || 5000

if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("/", (req, res) => {
        // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    })

    app.listen(port, () => { console.log(`Express in '${process.env.NODE_ENV}' ${port}`) })
}

if (process.env.NODE_ENV == "development") {
    console.log('dev server express')
    app.listen(port, () => { console.log(`hey! Express in '${process.env.NODE_ENV}' ${port}`) })
}

// for devlopment , uncomment -
// app.listen(port, () => { console.log(`express '${process.env.NODE_ENV}' on port- ${port}`) })

