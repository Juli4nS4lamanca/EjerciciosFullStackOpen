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

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
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
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
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

  const blogForm = () => {
    return (
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <NewBlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setTypeMessage={setTypeMessage} />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>Blog</h1>
      <Notification message={message} type={typeMessage} />
      {user === null ?
        <LoginForm onSubmit={handleLogin} />
        :
        (
          <>
            <BtnLogout setUser={setUser} />
            {blogForm()}
            <RenderBlogs blogs={blogs} user={user} setBlogs={setBlogs}/>
          </>
        )}
    </div>
  )
}

export default App
