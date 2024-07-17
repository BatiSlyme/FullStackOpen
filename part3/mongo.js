const { mongoose } = require('mongoose')

const url = process.env.MONGODB_URL;
console.log('connecting to', url)

const name = process.argv[3];
const number = process.argv[4];

mongoose.set('strictQuery', false);

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    number: {
        type: String,
        required: true,
        minlength: 5
    },
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

// const Person = mongoose.model('Person', personSchema);

// if (name && number) {
//     const person = new Person({
//         name: name,
//         number: number,
//     });
//     console.log('person created');

//     person.save().then(result => {
//         console.log('person saved!', result);
//         mongoose.connection.close();
//     }).catch(error => console.log(error));
// } else {
//     Person.find({}).then(result => {
//         console.log('phonebook:');
//         result.forEach(note => {
//             console.log(note.name + ' ' + note.number)
//         })
//         mongoose.connection.close()
//     });
// }

module.exports = mongoose.model('Person', personSchema);

// Note.find({ important: true }).then(result => {
//     // ...
// })

