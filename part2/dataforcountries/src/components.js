import { useEffect, useState } from "react"
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY


const CountryInfo = ({country}) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`
        axios.get(url)
        .then(response => {
            setWeather(response.data)
        })
    }, [country])

    return(
    <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital.map(city => <span key={city}>{city}</span>)} </div>
        <div>area {country.area}</div>
        <div>
            <h2>languages:</h2>
                <ul>
                    {Object.keys(country.languages).map(langKey => <li key={langKey}>{country.languages[langKey]}</li>)}
                </ul>
        </div>
        <img src={country.flags.png} alt="flag"></img>
        {weather && Object.keys(weather).length === 0 ? 
            <div></div> :
            <div>
                <h2>Weather in {country.capital[0]}</h2>
                <p>temperature {weather.main.temp} Celsius</p>
                <img alt="weather-icon" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} ></img>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        }
    </div>
    )
} 

const Display = ({countries}) => {
    const [isShow, setIsShow] = useState([]) ;

    useEffect(() => {
        setIsShow(new Array(countries.length).fill(false))
    }, [countries.length])

    if (countries.length >= 10)
    return <p>Too many matches, specify another filter</p>

    if (countries.length > 1) {
       const showCountry = (event) => {
        setIsShow(isShow.map((bool, index) => index === parseInt(event.target.id) ? !bool : bool))
        } 

        return (
            <div>
                {countries.map((country, index) => {
                    return <div key={country.name.common}>
                        {country.name.common}
                        <button id={index} onClick={showCountry}>Show</button>
                        {isShow[index] ? <CountryInfo country={countries[index]} /> : <></>}
                        </div>
                })}
            </div>
        )
    }
    
    if (countries.length === 1) {
        return <CountryInfo country={countries[0]} />
    }

    return <div></div>
    
}

export {Display}