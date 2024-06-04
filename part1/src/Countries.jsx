import axios from 'axios';
import { useState, useEffect } from 'react';
const api_key = import.meta.env.VITE_SOME_KEY

const getAllCountries = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    return request.then(response => response.data);
}

const getWeather = (capital) => {
    const request = axios.get(`https://openweathermap.org/data/2.5/find?q=${capital}&appid=${api_key}&units=metric`)
    return request.then(response => {
        const lat = response.data.list[0].coord.lat;
        const lon = response.data.list[0].coord.lon;
        return axios.get(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`).
            then(response => response.data);
    });
}

const Fitler = ({ countries, searchFilter }) => {
    const [temp, setTemp] = useState(0);
    const [wind, setWind] = useState(0);
    const [iconId, setIconId] = useState();
    const [icon, setIcon] = useState();

    useEffect(() => {
        if (iconId) {
            setIcon(`https://openweathermap.org/img/wn/${iconId}@2x.png`)

        }
    }, [iconId])

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
        const country = filteredCountries[0];
        const languages = Object.values(country.languages);
        getWeather(country.capital).then(response => {
            console.log(response);
            setTemp(response.current.temp);
            setWind(response.current.wind_speed);
            setIconId(response.current.weather[0].icon)
        });

        return (<>
            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{country.name.common}</div>
            <div >area {country.area}</div>
            <div >capital {country.capital}</div>
            <div style={{ fontWeight: 'bold' }}>languages: </div>
            <ul>{languages.map(f => <li key={f}> {f}</li>)} </ul>
            <img src={country.flags.png} />
            <div style={{ fontWeight: 'bold', fontSize: 22 }}>Weather in {country.capital}</div>
            <div>temperature {temp} Celcius</div>
            <img src={icon} />
            <div>wind {wind} m/s</div>

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