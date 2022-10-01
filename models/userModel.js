const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please enter username!']
    },
    email:{
        type: String,
        required: [true, 'Please enter an email!']
    },
    hash: {
        type: String,
        required: [true, 'could not receive hash!']
    },
    salt: {
        type: String,
        required: [true, 'could not receive hash!']
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)