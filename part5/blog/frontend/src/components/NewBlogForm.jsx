import { useState } from 'react'

const NewBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await handleCreateBlog({ title, url, author })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog} className="NewBlogForm">
      <h1>Create new Blog</h1>
      <label>Title
        <input type="text"
          value={title}
          name="title"
          id="title"
          data-testid="title"
          onChange={({ target }) => setTitle(target.value)} />
      </label>
      <label>Url
        <input type="text"
          value={url}
          name="url"
          id="url"
          data-testid="url"
          onChange={({ target }) => setUrl(target.value)} />
      </label>
      <label>Author
        <input type="text"
          value={author}
          name="author"
          id="author"
          data-testid="author"
          onChange={({ target }) => setAuthor(target.value)} />
      </label>
      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlogForm
