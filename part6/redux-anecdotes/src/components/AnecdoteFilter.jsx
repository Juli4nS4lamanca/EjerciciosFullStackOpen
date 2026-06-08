import { useDispatch, useSelector } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const filterValue = useSelector(state => state.filter)

  const handleInputChange = (e) => {
    dispatch(filterChange(e.target.value))
  }

  const clearFilter = () => {
    dispatch(filterChange(''))

  }


  return (
    <>
      <input type="text" name="filter" value={filterValue} onChange={handleInputChange} />
      <button onClick={clearFilter}>Clear</button>
    </>
  )
}

export default AnecdoteFilter