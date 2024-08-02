const personsRouter = require('express').Router();
const Person = require('../models/person');
const logger = require('../utils/logger')

personsRouter.get('/', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
    })
})

// personsRouter.get('/api/info', (req, res) => {
//     const count = persons.length
//     res.send(`<br><p>Phonebook has info for ${count} people</p><p>${new Date()}</p></br>`)
// })

personsRouter.get('/:id', (req, res, next) => {
    // const id = Number(req.params.id);
    // const person = persons.find(person => person.id === id);

    // if (person) {
    //     res.json(person);
    // } else {
    //     res.status(404).end();
    // }
    Person.findById(String(req.params.id ?? '')).then(person => {
        if (person) {
            res.json(person)
        } else {
            res.status(404).end()
        }
    }).catch(error => next(error)
        // {
        //    logger.info(error);
        //     res.status(400).send({ error: 'malformatted id' })
        // }
    )
})

personsRouter.delete(':id', (req, res, next) => {
    const id = String(req.params.id)
    Person.findByIdAndDelete(id)
        .then(() => { res.status(204).end(); logger.info('deleted') })
        .catch(error => next(error))
    // persons = persons.filter(person => person.id !== id);

})

personsRouter.post('/', (req, res, next) => {
    const body = req.body
    logger.info(body)
    if (!body.number || !body.name) {
        return res.status(400).json({ error: 'content missing' })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    }).catch(error => next(error))

})

personsRouter.put(':id', (req, res, next) => {
    const body = req.body
    logger.info('body', body)
    logger.info('req.params', req.params)
    logger.info('id', req.params.id, typeof req.params.id)

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            res.json(result).end()
        })
        .catch(error => next(error))
})

module.exports = personsRouter;