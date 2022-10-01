const express = require('express')
const userRouter = express.Router()
// const userRouter = require('express').Router();
// const passport = require('passport')
const { subscribe } = require('../controllers/newsletterController')
const { register, login, logout } = require('../controllers/userController')
const { getQuote, postQuote, getuserQuote, deleteQuote } = require('../controllers/quoteController')
const { search, getUserProfile } = require('../controllers/searchController')
const utils = require('../lib/utils')


userRouter.route('/subscribe').post(subscribe)
userRouter.route('/logout').get(logout)

userRouter.route('/api/quotes').get(getQuote).post(postQuote)
userRouter.route('/api/quotes/:id').delete(deleteQuote)

// userRouter.route('/api/quotes').post(passport.authenticate('jwt', { session: false }), postQuote)

//REGISTER LOGIN
userRouter.route('/api/users/register').post(register)
userRouter.route('/api/users/login').post(login)


userRouter.route('/api/userquotes/:id').get(getuserQuote)
// userRouter.route('/api/quotes').get(passport.authenticate('jwt', { session: false }), getQuote)
userRouter.route('/express').get((req, res) => {
    res.status(200).json({"message":"express server active !!"})
})
// userRouter.get('*', function(req, res){
//     res.status(404).send(`<h2>what are you doing here? No such page exist! </h2>`);
//   });


userRouter.route('/search/:id').get(search)

userRouter.route('/user/:id').get(getUserProfile)


module.exports = userRouter