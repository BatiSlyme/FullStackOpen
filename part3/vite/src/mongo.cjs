const { mongoose } = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
    `mongodb+srv://simbakalov:${password}@cluster0.b6z3jy7.mongodb.net/person?retryWrites=true&w=majority`;
mongoose.set('strictQuery', false)

mongoose.connect(url);
console.log('connected to MongoDB');

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});
// console.log('schema created');

const Person = mongoose.model('Person', personSchema);
// console.log('model created');

if (name && number) {
    const person = new Person({
        name: name,
        number: number,
    });
    console.log('person created');

    person.save().then(result => {
        console.log('person saved!', result);
        mongoose.connection.close();
    }).catch(error => console.log(error));
} else {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(note => {
            console.log(note.name + ' ' + note.number)
        })
        mongoose.connection.close()
    });
}

// Note.find({ important: true }).then(result => {
//     // ...
// })

