const Newsletter_Email = require('../models/newsletterModel')


const subscribe = async (req, res) => {
    const email = req.body.email
    // console.log(req.body)
    try {
        if(!email) {
            // res.status(400).json({"msg":"invalid entry!!"})
            res.status(400)
            throw new Error('Empty field: Please add an email !!')
        }
        const userExists = await Newsletter_Email.findOne({ email: email })
        if(userExists){
            res.status(409)
            throw new Error('Email already subscribed!!')
        }
        const createUser = await Newsletter_Email.create({ email: email, useragent: req.headers['user-agent'] })
        if(createUser){
            res.status(201).json({ 
                message: "subscribed !!",
                _id: createUser.id,
                email: createUser.email
            })
        }
    } catch (error) {
        console.log(error)
        res.json(error.message)
        // res.status(400).send(error)      
    }
	
}

module.exports = {subscribe}

