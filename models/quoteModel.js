const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
    quote: {
        type: String,
        required: [true, 'Please add a quote !!']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    useragent: {
        type: String,
        default: ''
    },
    audience: {
        type: String,
        enum: ['everyone','private'],
        default: 'everyone'
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Quote', quoteSchema)

//date: { type: Date, default: Date.now },
//
// blogSchema.remove(({ date:{"$lt":new Date(2021,9, 1) } }), function (err) {
//     if (err){
//         console.log(err)
//     }
//     else{
//         console.log("Deleted Blogs");
//     }
//  });