const config = require('../utils/config');
const mongoose = require('mongoose');
const url = config.MONGODB_URL;
console.log('blogs -> connecting to', url)

// const name = process.argv[3]
// const number = process.argv[4]

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title required'],
    },
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)


