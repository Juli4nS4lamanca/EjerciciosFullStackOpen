import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import RenderBlogs from './components/RenderBlogs'
import BtnLogout from './components/BtnLogout'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)
  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    /* Con localStorage se guarda la session aunque se cierre el navegador
    y con sessionStorage se cierra cuando se cierra el navegador*/
    const loggedUserJson = window.sessionStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    if (user) {
      fetchBlogs()
    }

  }, [user])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })
      window.sessionStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setMessage(`Welcome ${user.name}`)
      setTypeMessage('success')
    } catch (exception) {
      setMessage('Credentials Error')
      setTypeMessage('error')
    } finally {
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {

    try {
      const updateBlog = await blogService.update(blog)
      setBlogs(prev => prev.map(b => b.id === blog.id ? updateBlog : b))
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (blog) => {
    const ok = window.confirm(`Desea eliminar el blog "${blog.title}"?`)

    if (!ok) return

    try {
      await blogService.remove(blog.id)
      setBlogs(prev => prev.filter(b => b.id !== blog.id))

    } catch (error) {
      console.error(error)
      alert('Error eliminando el blog ', error)
    }
  }

  const handleCreateBlog = async ({ title, url, author }) => {
    const blogObject = { title, url, author }
    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(prevBlogs => prevBlogs.concat(savedBlog))
      setMessage(`a new blog ${title} by ${author} added`)
      setTypeMessage('success')
    } catch (error) {
      setMessage(`${error.response.data.error}`)
      setTypeMessage('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <NewBlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
    )
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Log In" ref={loginFormRef}>
        <LoginForm onSubmit={handleLogin} />
      </Togglable>

    )
  }

  return (
    <div>
      <h1>Blog</h1>
      <Notification message={message} type={typeMessage} />
      {user === null ?
        loginForm()
        :
        (
          <>
            <BtnLogout setUser={setUser} />
            {blogForm()}
            <RenderBlogs blogs={blogs} user={user} handleDelete={handleDelete} handleLike={handleLike} />
          </>
        )}
      <p>Blog App, Julian</p>
    </div>
  )
}

export default App
