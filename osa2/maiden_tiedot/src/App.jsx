import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/openWeather'

import CountryInfo from './components/countryInfo'
import Input from './components/input'

// Helper functions for accessing info about countries.
const getName = (country) => country.name.common
const getCapital = (country) => {
  if ("capital" in country) {
    return country.capital[0]
  }
  else {
    return "(Unknown capital)"    
  }
}
const getArea = (country) => country.area
const getLanguages = (country) => {
  if ("languages" in country) {
    return Object.values(country.languages)
  }
  else {
    return []
  }
}
const getFlagUrl = (country) => country.flags.png
const getFlagAlt = (country) => country.flags.alt
const getCapitalLat = (country) => {
  if ("latlng" in country.capitalInfo) {
    return country.capitalInfo.latlng[0]
  }
  else {
    return null
  }
} 
const getCapitalLon = (country) => {
  if ("latlng" in country.capitalInfo) {
    return country.capitalInfo.latlng[1]
  }
  else {
    return null
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryQuery,setCountryQuery] = useState("")
  const [countryName, setCountryName] = useState("")
  const [capital, setCapital] = useState("capital")
  const [area, setArea] = useState("area")
  const [languages, setLanguages] = useState([])
  const [flagUrl, setFlagUrl] = useState("")
  const [flagAlt, setFlagAlt] = useState("")
  const [weather, setWeather] = useState(null)

  const hook = () => {
    countryService.getAll()
    .then((response) => {
      const countryList = response.data
      console.log("Got",countryList.length, "countries. Data:",countryList)
      setCountries(countryList)
    })
  }
  useEffect(hook, [])

  // A unique match has been found for the country query. Set all country 
  // information.
  const setCountryInfo = (country) => {
    console.log("Country object:",country)
    setCountryName(getName(country))
    setCapital(getCapital(country))
    setArea(getArea(country))
    setLanguages(getLanguages(country))
    setFlagUrl(getFlagUrl(country))
    setFlagAlt(getFlagAlt(country))
    const lat = getCapitalLat(country)
    const lon = getCapitalLon(country)
    setWeather(null)
    if (lat != null && lon != null) {
      weatherService
        .getWeather(lat,lon)
        .then((response) => {
          const weather = response.data
          console.log("Weather:",weather)
          setWeather(weather)
        })
        .catch((response) => {
          console.log("Weather query failed")
        })
    }
    console.log(
      "Country info:",
      countryName,
      capital,
      area,
      languages,
      flagUrl,
      flagAlt,
      weather
    )
  }

  // The user has changed the query input. Update the query. If only a unique
  // country remains which matches the query, set all country information in 
  // preparation of displaying the country to the user. 
  const setInput = (query) => {
    console.log("Country query:",query)
    setCountryQuery(query)
    const fCountries = countries.filter(
      (country) => getName(country).toLowerCase().indexOf(query) !== -1
    )
    setFilteredCountries(fCountries)
    console.log("Number of filtered countries:",fCountries.length)
    if (fCountries.length == 1) {
      console.log("Found unique matching country for query")
      setCountryInfo(fCountries[0])
    }
  }
    
  // Wait until the country database has been loaded before rendering output.
  // Indicate if the database is still loading.
  if (countries.length > 0) {
    return (
      <>
        <Input 
          countryQuery={countryQuery}
          setter={setInput}
        />
        <CountryInfo 
          countries={filteredCountries}
          setter={setInput}
          name={countryName}
          capital={capital}
          area={area}
          languages={languages}
          flagUrl={flagUrl}
          flagAlt={flagAlt}
          weather={weather}
        />
      </>
    )
  }
  else {
    return <p>Loading...</p>
  }
}

export default App
