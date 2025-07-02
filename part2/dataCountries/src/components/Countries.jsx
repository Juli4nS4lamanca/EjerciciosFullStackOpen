import BtnShow from './BtnShow.jsx'
import Countrie from './Countrie.jsx'
import CountrieData from './CountrieData.jsx'

const Countries = ({ countries, query }) => {

  const getListCountries = query => {
    return countries.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))
  }

  const listCountries = getListCountries(query)

  return (
    <>
      {listCountries.length <= 10 && listCountries.length > 1 ? (
        listCountries.map(countrie => (
          <div key={countrie.ccn3}>
            <Countrie countrie={countrie} />
            <BtnShow countrie={countrie} />
          </div>
        ))
      ) : listCountries.length >= 10 ? (
        <p>Too many matches, especify another filter</p>
      ) : listCountries.length === 1 ? (
        <CountrieData countrie={listCountries[0]} />
      ) : (
        <p>No matches</p>
      )}
    </>
  )
}

export default Countries
