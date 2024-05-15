import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('');
  const addName = (event) => {
    event.preventDefault();
    
    if (persons.some(persons => persons.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    if (newName !== '') {
      const personsCopy = [...persons];
      personsCopy.push({ name: newName });
      setPersons(personsCopy);
      setNewName('');
    }

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{persons.map((f, i) => <li key={i}>{f.name}</li>)}</ul>

    </div>
  )
}

export default App