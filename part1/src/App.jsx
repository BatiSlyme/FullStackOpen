import { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';
import personService from './services/personService';

const Footer = () => {
  //inline style
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const Notifications = ({ msg }) => {
  return (msg ?
    <div className='success'>
      {msg}
    </div> :
    <div></div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

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
          setErrorMessage(`${newName}'s number has been updated`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000);
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
        setErrorMessage(`${newName} has been added to the phonebook`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
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
      <Notifications msg={errorMessage} />
      <PersonForm
        submit={submit}
        handleNameChange={handleNameChange}
        newName={newName}
        handlePhoneNumberChange={handlePhoneNumberChange}
        phoneNumber={phoneNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
      <Footer />
    </div>
  );
};

export default App