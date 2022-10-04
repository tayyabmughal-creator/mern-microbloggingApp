const Quote = require('../models/quoteModel')

const getQuote = async (req, res) => {
    try {// console.log(req.user)
        // const response = await Quote.find({ user: req.user.id })  //when in passport will be using this
        const response = await Quote.find()
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }
}

/*
// console.log('req headers-> ')
// console.log(req)
// console.log(req.headers)
// console.log(req.headers['x-forwarded-host'])
// console.log(req.body)
*/

const postQuote = async (req, res) => {
    try {
        if(!req.body['quote']) {
            res.status(400)
            throw new Error('Please add quote !!')
        }
        const quotes = await Quote.create({
            quote: req.body.quote,   
            user: req.body.user,
            useragent: req.headers['user-agent'],
            audience: req.body.audience
          })
        //console.log('req.user.id->', req.user._id) //_id gives in the the console this-> new ObjectId(12..) .. req.user is formed when implementing passport
        if(quotes) {
            res.status(200).json({message: "Quote posted"})
        }
    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
}

const getuserQuote = async (req, res) => {
    try { //{ user: req.user.id }
        // console.log(req.user)
        const response = await Quote.find({user: req.params.id})
        // console.log(response)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
}

const deleteQuote = async (req, res) => {
    try {
        const deletedQuote = await Quote.findByIdAndDelete(req.params.id)
        // console.log('deletedQuote', deletedQuote)
        res.status(200).json(deletedQuote)
    } catch (error) {
        console.log(error)
        res.json(error.message)        
    }
}

const ua = async (req, res) => {
    try {
        // console.log('testhead- ', req.headers)
        const vis = await Visit.create({
         useragent: req.headers['user-agent']
        })
        console.log('vis', vis)
        if (vis) {
            res.status(200).send('')
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getQuote, postQuote, getuserQuote, deleteQuote, ua }