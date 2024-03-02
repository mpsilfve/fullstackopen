// Helper functions for weather info
const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2)
const getWeatherIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`
const getWeatherIconAlt = (icon) => `Weather icon: ${icon}`

// Display weather information. If the information hasn't been loaded yet, 
// indicate that it is still loading.
const Weather = ({ weather, capital }) => {    
    if (weather == null) {
        console.log("Weather info unavailable") 
        return (
          <>
            <h2>Weather in {capital}</h2>
            <p>Loading...</p> 
          </>
        )
    }
    const temp = weather.current.temp
    const wind = weather.current.wind_speed
    const weatherIcon = weather.current.weather[0].icon
    const weatherIconUrl = getWeatherIconUrl(weatherIcon) 
    const weatheIconAlt = getWeatherIconAlt(weatherIcon)
    console.log("Weather: temp",temp,"wind",wind,"weatherIconUrl",weatherIconUrl)
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {kelvinToCelsius(temp)} Celsius</p>
        <img src={weatherIconUrl} alt={weatheIconAlt} height="100" />
        <p>wind {wind} m/s</p>
      </div>
    )
}

export default Weather