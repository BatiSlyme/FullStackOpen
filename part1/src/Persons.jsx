const Persons = ({ persons, filterName }) => {
    return (<ul>{persons.filter(f => {
        let re = new RegExp(`${filterName}`);
        if (re.test(f.name.toLocaleLowerCase())) {
            return f;
        }
    }).map((f, i) => <li key={i}>{f.name} {f.number}</li>)}
    </ul>);
};

export default Persons;
