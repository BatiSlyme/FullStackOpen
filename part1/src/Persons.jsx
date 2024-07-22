import personService from "./services/personService";

const deletePerson = (person, setErrorMessage, setPersons, persons) => {
    confirm(`Are you sure you want to delete ${person.name}?`);
    personService.deletePerson(person.id).then((response) => {
        let personCopy = [...persons];
        personCopy = personCopy.filter(f => f.id !== person.id);
        console.log(personCopy);
        setPersons(personCopy);
        console.log(person.name + ' deleted');
        setErrorMessage({ msg: `${person.name} has been deleted`, type: 'success' });
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000);
    }).catch(error => {
        setErrorMessage({ msg: error.response.data.error, type: 'error' });
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    });
}

const DeleteBtn = ({ id, setErrorMessage, setPersons, persons }) => {
    return (
        <button onClick={() => { deletePerson(id, setErrorMessage, setPersons, persons) }}>
            delete
        </button >
    );
};

const Persons = ({ persons, filterName, setErrorMessage, setPersons }) => {
    return (<ul>{persons.filter(f => {
        let re = new RegExp(`${filterName}`);
        if (re.test(f.name.toLocaleLowerCase())) {
            return f;
        }
    }).map((f, i) => <li className="person" key={i}>{f.name} {f.number} <DeleteBtn id={f} setErrorMessage={setErrorMessage} setPersons={setPersons} persons={persons} /> </li>)}
    </ul>);
};

export default Persons;
