import { useState } from 'react'
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const submit = (event) => {
    event.preventDefault();

    if (persons.some(persons => persons.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    if (newName !== '') {
      const personsCopy = [...persons];
      personsCopy.push({ name: newName, number: phoneNumber });
      setPersons(personsCopy);
      setNewName('');
      setPhoneNumber('');
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value);
    setPhoneNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  }

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
  )
}

export default App