import { useState } from 'react'

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
      filter shown with: <input value={filterName} onChange={handleFilterChange} />
      <div><h1>add a new</h1></div>
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
      <ul>{persons.filter(f => {
        let re = new RegExp(`${filterName}`);
        if (re.test(f.name.toLocaleLowerCase())) {
          return f;
        }
      }).map((f, i) => <li key={i}>{f.name} {f.number}</li>)}</ul>
    </div>
  )
}

export default App