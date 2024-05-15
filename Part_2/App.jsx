import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-12312' }
  ])
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value)
    setPhoneNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{persons.map((f, i) => <li key={i}>{f.name} {f.number}</li>)}</ul>

    </div>
  )
}

export default App