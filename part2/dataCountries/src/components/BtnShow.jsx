import { useState } from "react"
import CountrieData from "./CountrieData"

const BtnShow = ({ countrie }) => {
  const [show, setShow] = useState(false)
  const showData = () => {
    setShow(!show)
  }

  return (
    <>
      <button onClick={showData}>{show ? 'Hidden' : 'Show'}</button>
      {show ? (
        <CountrieData countrie={countrie} />
      ) : (null)}
    </>
  )

}

export default BtnShow
