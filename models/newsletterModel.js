const mongoose = require('mongoose')

const newsletterSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email for newsletter']
    },
    useragent: {
        type: String,
        default: ''
    }
},
{
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
})

module.exports = mongoose.model('Newsletter_Email', newsletterSchema)