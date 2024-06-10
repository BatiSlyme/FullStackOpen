const express = require('express');
const app = express();
var morgan = require('morgan');
app.use(morgan('combined'));

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0;
    return maxId + 1;
};

app.get('/api/persons', (request, response) => {
    response.json(persons)
});

app.get('/api/info', (request, response) => {
    const count = persons.length;
    response.send(`<br><p>Phonebook has info for ${count} people</p><p>${new Date()}</p></br>`);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const body = request.body;
    console.log(body);
    if (!body.number || !body.name) {
        return response.status(400).json({ error: 'content missing' });
    } else if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' });
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);
    response.json(person);
});


// let notes = [
//     {
//         id: 1,
//         content: "HTML is easy",
//         important: true
//     },
//     {
//         id: 2,
//         content: "Browser can execute only JavaScript",
//         important: false
//     },
//     {
//         id: 3,
//         content: "GET and POST are the most important methods of HTTP protocol",
//         important: true
//     }
// ];



// app.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// });

// app.get('/api/notes', (request, response) => {
//     response.json(notes)
// });



// app.post('/api/notes', (request, response) => {
//     const body = request.body;

//     if (!body.content) {
//       return response.status(400).json({ 
//         error: 'content missing' 
//       });
//     };

//     const note = {
//       content: body.content,
//       important: Boolean(body.important) || false,
//       id: generateId(),
//     };

//     notes = notes.concat(note);

//     response.json(note);
//   });

// app.get('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id);
//     console.log(id);

//     const note = notes.find(note => {
//         console.log(note.id, typeof note.id, id, typeof id, note.id === id)
//         return note.id === id
//     });

//     if (note) {
//         response.json(note);
//     } else {
//         response.status(404).end();
//     }
// });

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id);
//     notes = notes.filter(note => note.id !== id);
//     response.status(204).end();
// });

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});