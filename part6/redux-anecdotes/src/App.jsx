import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    /*     const fetchAnecdotes = async () => {
          const anecdotes = await anecdoteService.getAll()
          dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)))
        }
        fetchAnecdotes()
     */
    dispatch(initializeAnecdotes())

  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
