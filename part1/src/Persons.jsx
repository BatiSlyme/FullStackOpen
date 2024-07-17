import personService from "./services/personService";

const deletePerson = (person, setErrorMessage) => {
    confirm(`Are you sure you want to delete ${person.name}?`);
    personService.deletePerson(person.id).then((response) => {
        console.log(person.name + ' deleted')
        setErrorMessage(`${person.name} has been deleted`);
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000);
    }).catch(error => console.log(error));
}

const DeleteBtn = ({ id, setErrorMessage }) => {
    return (
        <button onClick={() => { deletePerson(id, setErrorMessage) }}>
            delete
        </button >
    );
};

const Persons = ({ persons, filterName, setErrorMessage }) => {
    return (<ul>{persons.filter(f => {
        let re = new RegExp(`${filterName}`);
        if (re.test(f.name.toLocaleLowerCase())) {
            return f;
        }
    }).map((f, i) => <li className="person" key={i}>{f.name} {f.number} <DeleteBtn id={f} setErrorMessage={setErrorMessage} /> </li>)}
    </ul>);
};

export default Persons;
