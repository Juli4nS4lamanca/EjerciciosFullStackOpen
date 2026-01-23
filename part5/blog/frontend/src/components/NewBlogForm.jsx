import { useState } from "react"
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs, setMessage, setTypeMessage }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      url: url,
      author: author
    }
    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      setMessage(`a new blog ${title} by ${author} added`)
      setTypeMessage('success')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setMessage(`${error.response.data.error}`)
      setTypeMessage('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  return (
    <form onSubmit={addBlog} className="NewBlogForm">
      <h1>Create new Blog</h1>
      <label>Title
        <input type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)} />
      </label>
      <label>Url
        <input type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)} />
      </label>
      <label>Author
        <input type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)} />
      </label>
      <button type="submit">Create</button>
    </form>
  )
}

export default NewBlogForm
