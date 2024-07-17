require('dotenv').config();
const express = require('express');
const app = express();
var morgan = require('morgan');
const cors = require('cors');
app.use(express.static('dist'));
const Person = require('./mongo.js')
// app.use(express.json());
// app.use(express.static('dist'));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
// app.use(cors());
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

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }

    next(error);
}

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0;
    return maxId + 1;
};

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.json(person);
    })
    // res.json(person)
});

app.get('/api/info', (req, res) => {
    const count = persons.length;
    res.send(`<br><p>Phonebook has info for ${count} people</p><p>${new Date()}</p></br>`);
});

app.get('/api/persons/:id', (req, res, next) => {
    // const id = Number(req.params.id);
    // const person = persons.find(person => person.id === id);

    // if (person) {
    //     res.json(person);
    // } else {
    //     res.status(404).end();
    // }
    Person.findById(String(req.params.id ?? '')).then(person => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    }).catch(error => next(error)
        // {
        //     console.log(error);
        //     res.status(400).send({ error: 'malformatted id' })
        // }
    );
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = String(req.params.id);
    Person.findByIdAndDelete(id)
        .then(result => { res.status(204).end(); console.log('deleted'); })
        .catch(error => next(error));
    // persons = persons.filter(person => person.id !== id);

});

app.post('/api/persons', (req, res, next) => {
    const body = req.body;
    console.log(body);
    if (!body.number || !body.name) {
        return res.status(400).json({ error: 'content missing' });
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        res.json(savedPerson);
    }).catch(error => next(error));

});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;
    console.log('body', body);
    console.log('req.params', req.params);
    console.log('id', req.params.id, typeof req.params.id);

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            res.json(result).end();
        })
        .catch(error => next(error));
});

app.use(errorHandler);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});