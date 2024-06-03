import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';
import personService from './services/personService';
const baseUrl = 'http://localhost:3001/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, [persons]);

  const submit = (event) => {
    event.preventDefault();

    if (persons.some(persons => persons.name === newName)) {
      confirm(`${newName} is already in the phonebook, replace the old phone number with a new one?`);
      personService.
        update(persons.find(f => f.name === newName).id, { name: newName, number: phoneNumber }).
        then(response => {
          console.log(`updated ${response}`);
          setNewName('');
          setPhoneNumber('');
        });
      return;
    }

    if (newName !== '') {
      const personsCopy = [...persons];
      personsCopy.push({ name: newName, number: phoneNumber });
      personService.create({ name: newName, number: phoneNumber }).then((response) => {
        console.log('created new ', response.data);
        response.data;
        setPersons(personsCopy);
        setNewName('');
        setPhoneNumber('');
      });
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value);
    setPhoneNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <div><h1>add a new</h1></div>
      <PersonForm
        submit={submit}
        handleNameChange={handleNameChange}
        newName={newName}
        handlePhoneNumberChange={handlePhoneNumberChange}
        phoneNumber={phoneNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App