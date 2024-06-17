const Weather = ({weather}) => {
    if (!weather) return 
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius
            <br/>
            <div id="weather-container">
                <img src={iconUrl} width="150" id="weathericon" />
                <p id="weatherdescription">{weather.weather[0].description}</p>
                <br/>   
            </div>
            wind {weather.wind.speed} m/s
        </div>
    )
}

export default Weather