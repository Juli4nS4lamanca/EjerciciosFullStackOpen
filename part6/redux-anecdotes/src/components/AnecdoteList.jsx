import { useSelector, useDispatch } from "react-redux"
import { updateVotos } from "../reducers/anecdoteReducer"
import { setNotificacion } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content?.toLowerCase().includes(state.filter.toLowerCase()))
  })

  const voteID = async id => {
    const anecdoteVoted = anecdotes.find((a) => a.id === id)
    dispatch(updateVotos(anecdoteVoted))
    dispatch(setNotificacion(`You voted '${anecdoteVoted.content.slice(0, 20)}...'`, 3))
  }

  return (
    <>
      {
        anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteID(anecdote.id)}>vote</button>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default AnecdoteList