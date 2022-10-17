const CountryInfo = ({country}) => {
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
    </div>
    )
} 

const Display = ({countries}) => {
    if (countries.length >= 10)
    return <p>Too many matches, specify another filter</p>

    if (countries.length > 1) {
        return (
            <div>
                {countries.map(country => {
                    return <div key={country.name.common}>
                        {country.name.common}
                        <button>Show</button>
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