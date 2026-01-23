import { useState } from 'react'
import noteService from '../services/notes'

const NoteForm = ({ notes, setNotes, noteFormRef }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        /*Solo se renderiza despues que Togglabe se renderiza */
        if (noteFormRef.current) {
          noteFormRef.current.toggleVisibility()
        }
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  return (
    < form onSubmit={addNote} >
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form >
  )
}

export default NoteForm
