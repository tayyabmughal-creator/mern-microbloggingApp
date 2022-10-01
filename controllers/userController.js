const User = require('../models/userModel')
const utils = require('../lib/utils')

const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        if (!username || !email || !password) {
            res.status(400)
            throw new Error('please enter all fields')
        }

        const userTaken = await User.findOne({ $or: [ { username: username }, {email: email} ] })
        if(userTaken) {
            res.status(409)
            throw new Error('user already exist')
        }        

        const saltHash = utils.genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const createUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            hash: hash,
            salt: salt
        })
        if(createUser) {
            // const tokenObject = await utils.issueJWT(createUser)
            // res.cookie('jwt', tokenObject.token, {httpOnly: true})
            res.status(201).json({ id: createUser._id, user: createUser.username })
        }
    } catch (err) {
        // res.json({ success: false, message: err.message }); //payload for frontend //can delete this example comment
        res.json(err.message);
    }
};

const login = async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            res.status(400)
            throw new Error('invalid details !!')
        }
        const user = await User.findOne({ username })
        if (!user) {
            res.status(400)
            throw new Error('no user with this details !!')
        }
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt)
        if (!isValid) {
            res.status(400)
            throw new Error('invalid password !!')
        }
        // const tokenObject = await utils.issueJWT(user)
        // res.cookie('jwt', tokenObject.token, {httpOnly: true})
        res.status(200).json({ id: user._id, user: user.username })

    } catch (error) {
        console.log(error)
        res.json(error.message)
    }
}

const logout = (req, res) => {
    res.status(200).clearCookie('jwt').json({message:"log out"})
}

module.exports = { register, login, logout }












// //register user
// const register = async (req, res) => {

//     const { username, email, password } = req.body

//     try {
//         // validate
//     if (!username || !email || !password) {
//         res.status(401)
//         throw new Error('please enter all fields')
//     }

//     // check if user exist
//     const userExists = await User.findOne({ email })
//     if (userExists) {
//         res.status(409)
//         throw new Error('user already registered!!')
//     }

//     // create user
//     const createUser = await User.create({ username, email, password })

//     if (createUser) {
//         res.status(201).json({
//             _id: createUser.id,
//             username: createUser.username,
//             email: createUser.email,
//         })
//     }

//     } catch (error) {
//         console.log(error)
//         res.json(error.message)
//     }
// }
