const config = require('../utils/config');
const mongoose = require('mongoose');
const url = config.MONGODB_URL;
console.log('recipe -> connecting to', url);


mongoose.set('strictQuery', false);

mongoose.connect(url)
    .then(() => {
        console.log('recipes connected to MongoDB')
    })
    .catch(error => {
        console.log('recipes-->error connecting to MongoDB:', error.message)
    });

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title required'],
    },
    author: String,
    content: {
        type: String,
        required: [true, 'Content required'],
        validate: {
            validator: function (v) {
                const words = ["laino", "otrova"];
                const regex = new RegExp(words.join("|"), 'i');
                if (regex.test(v)) {
                    return false;
                }
                return true;
            },
            message: props => `${props.value} no offensive words or poisonous substances allowed!`
        }
    },
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);


