const mongoose = require('mongoose')

const visitSchema = mongoose.Schema({
    useragent: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: new Date()
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Visit', visitSchema)