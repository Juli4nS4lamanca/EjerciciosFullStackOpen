import axios from "axios"
import { useEffect, useState } from "react"

const CountrieData = ({ countrie }) => {
  const weatherKey = import.meta.env.VITE_WEATHER_KEY
  const latlng = countrie.capitalInfo.latlng
  const [weather, setWeather] = useState(null)
  const [loadingWeather, setLoadingWeather] = useState(false)

  useEffect(() => {
    setLoadingWeather(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${weatherKey}&units=metric`
    axios
      .get(url)
      .then(response => {
        setLoadingWeather(false)
        setWeather(response.data)
      })

  }, [latlng[0], latlng[1]])
  const urlImg = weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : ""

  const languages = countrie.languages

  return (
    <div className="countrie">
      <h2>{countrie.name.common}</h2>
      <p>Capital: {countrie.capital}</p>
      <p>Area: {countrie.area}</p>
      <h3>Languajes</h3>
      <ul>
        {Object.values(languages).map(lg => (
          <li key={lg}>{lg}</li>
        ))}
      </ul>
      <img src={countrie.flags.png} alt={countrie.flags.alt} />
      <h3>Weather in {countrie.capital}</h3>
      {loadingWeather ? (
        <p>Loading Weather...</p>
      ) : weather ? (
        <>
          <p>Temperature: {weather.main.temp} Celcius</p>
          <img src={urlImg} alt={weather.weather[0].description} />
          <p>{weather.weather[0].description}</p>
          <p>Wind: {weather.wind.speed}m/s</p>
        </>
      ) : null}
    </div>
  )
}

export default CountrieData
