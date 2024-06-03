import personService from "./services/personService";

const deletePerson = (person) => {
    confirm(`Are you sure you want to delete ${person.name}?`);
    personService.deletePerson(person.id).then((response) => console.log(response));
}

const DeleteBtn = ({ id }) => {
    return (
        <button onClick={() => { deletePerson(id) }}>
            delete
        </button >
    );
};

const Persons = ({ persons, filterName }) => {
    return (<ul>{persons.filter(f => {
        let re = new RegExp(`${filterName}`);
        if (re.test(f.name.toLocaleLowerCase())) {
            return f;
        }
    }).map((f, i) => <li key={i}>{f.name} {f.number} <DeleteBtn id={f} /> </li>)}
    </ul>);
};

export default Persons;
