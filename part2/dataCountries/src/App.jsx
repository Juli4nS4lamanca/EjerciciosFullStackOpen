import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {

  const [filter, setFilter] = useState('')
  const handleFilterChange = event => {
    setFilter(event.target.value)
  }
  const [countries, setCountries] = useState([])
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  return (
    <>
      <h1>Data Countries</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} query={filter} />
    </>
  )
}

export default App
