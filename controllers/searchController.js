const Quote = require('../models/quoteModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

const search = async (req, res) => {
    try {
        const dbresponse = await User.find({username: req.params.id})
        const response = await dbresponse.map((obj) => obj.username )
        
        if(response.length !== 0) {
            res.status(200).json(response)
        } 
        if(response.length == 0) {
            res.status(404)
            throw new Error('No user found')
            // .json({"message": "no user found"})
        }
        
        // res.status(200).json({"response": response}) //json format

    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
}

const getUserProfile = async (req, res) => {
    let username = req.params.id
    // console.log('username')
    // console.log(username)
    try {
        //get mongodb ObjectId _id in dbresponse1
        const dbresponse1 = await User.find({username: req.params.id})

        let result = await Quote.aggregate([
            {
              '$match': {
                'user': dbresponse1[0]["_id"], 
                'audience': 'everyone'
              }
            }, {
              '$project': {
                'quote': 1,
                '_id': 0
              }
            }
        ])

        // console.log(result)
        res.status(200).json(result)
       
    } catch (error) {
        console.log(error)
    }
}

module.exports = { search, getUserProfile }