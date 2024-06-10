const express = require('express');
const app = express();
var morgan = require('morgan');
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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

app.get('/api/persons', (req, res) => {
    res.json(persons)
});

app.get('/api/info', (req, res) => {
    const count = persons.length;
    res.send(`<br><p>Phonebook has info for ${count} people</p><p>${new Date()}</p></br>`);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    console.log(body);
    if (!body.number || !body.name) {
        return res.status(400).json({ error: 'content missing' });
    } else if (persons.some(person => person.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);
    res.json(person);

    morgan.token('body', request => JSON.stringify(request.body));
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