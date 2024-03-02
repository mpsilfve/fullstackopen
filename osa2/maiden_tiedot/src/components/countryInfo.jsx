import Weather from './weather'

// Helper for getting a list of country names
const getNames = (countries) => countries.map((country) => country.name.common)

// Depending on how many countries (given in the list `countries`) match 
// our current query, display either the country information (if there is a 
// unique matching country) or a country listing if there are more than one 
// but maximally 10 matching countries. Otherwise, display diagnostics.  
const CountryInfo = ({ 
  countries, setter, name, capital, area, languages, flagUrl, flagAlt, weather
}) =>
{
  if (countries.length == 1) {
    return (
      <>
        <h1>{name}</h1>
        <p>
          capital {capital}<br />
          area {area}
        </p>
        <p>
          <strong>languages:</strong>
        </p>
        <ul>
          {languages.map((lan) => <li key={lan}>{lan}</li>)}
        </ul>
        <img src={flagUrl} alt={flagAlt} height="150"/>
        <Weather 
          weather={weather} 
          capital={capital}
        />
      </>
    )
  }
  else if (countries.length > 1 && countries.length <= 10) {
    return <CountryListing countries={getNames(countries)} setter={setter}/>
  }
  else if (countries.length == 0) {
    return <p>No matching countries, specify another filter</p>
  }
  else {
    return <p>Too many matches, specify another filter</p>
  }
}

// List the countries. Each country is accompanied by a choose-button which 
// can be used to display its country information.
const CountryListing = ({ countries, setter }) => {
return (
  <>
    {countries.map((country) => (
      <div key={country}>
        {country}
        <ChooseCountry 
          countryName={country.toLowerCase()} 
          setter={setter}
        />
        <br />
      </div>
    ))}
  </>
)}

// Clicking on this button will set the query to this particular country (i.e.
// `countryName`). In most cases, this is enough to ensure that `countryName` 
// is the only country matching the query.
const ChooseCountry = ({ countryName, setter }) => {
  return (
    <button onClick={() => setter(countryName)}>
      show
    </button>
  )
}

export default CountryInfo