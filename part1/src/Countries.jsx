import axios from 'axios';
import { useState, useEffect } from 'react';

const getAllCountries = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    return request.then(response => response.data);
}

const Fitler = ({ countries, searchFilter }) => {
    if (!searchFilter) {
        return;
    }

    const filteredCountries = countries.filter(f => {
        let re = new RegExp(`${searchFilter}`);
        if (re.test(f.name.common.toLocaleLowerCase())) {
            return f;
        }
    });


    if (filteredCountries.length > 10) {
        return <div>too many matches, specify the filter</div>
    } else if (filteredCountries.length === 1) {
        const languages = Object.values(filteredCountries[0].languages);

        return (<>
            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{filteredCountries[0].name.common}</div>
            <div >area {filteredCountries[0].area}</div>
            <div >capital {filteredCountries[0].capitan}</div>
            <div style={{ fontWeight: 'bold' }}>languages: </div>
            <ul>{languages.map(f => <li key={f}> {f}</li>)} </ul>
            <img src={filteredCountries[0].flags.png} />
        </>
        );
    }

    return (
        <ul>
            {filteredCountries.map(f => {
                return <li key={f.name.common}>{f.name.common} </li>
            })}
        </ul>
    );
}

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [searchFilter, setSearchFitler] = useState([]);


    useEffect(() => {
        getAllCountries().then(response => {
            console.log(response);
            setCountries(response);
        });
    }, []);

    const handleNameChange = (event) => {
        event.preventDefault();
        setSearchFitler(event.target.value);
    }

    return (
        <div>
            <form >
                name: <input value={searchFilter} onChange={handleNameChange} />
            </form>
            <Fitler countries={countries} searchFilter={searchFilter} />

        </div>

    )
}

export default Countries;