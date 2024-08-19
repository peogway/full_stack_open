import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async () => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Login'>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          ></LoginForm>
        </Togglable>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    blogService.addBlog(blog).then((newBlog) => {
      setBlogs(blogs.concat(newBlog))

      setNotificationMessage(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
  }

  const increaseLike = (targetBlog) => {
    blogService.incLike(targetBlog).then(() => {
      setBlogs(
        blogs
          .map((blog) =>
            blog.id === targetBlog.id
              ? { ...targetBlog, likes: targetBlog.likes + 1 }
              : blog
          )
          .sort((a, b) => b.likes - a.likes)
      )
    })
  }

  const deleteBlog = (targetBlog) => {
    if (
      window.confirm(`Remove blog ${targetBlog.title} by ${targetBlog.author}`)
    ) {
      blogService.deleteBlog(targetBlog.id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== targetBlog.id))
      })
    }
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in
        <button className='btn' onClick={handleLogout}>
          logout
        </button>
      </p>
      <br />

      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}></BlogForm>
      </Togglable>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog
            blog={blog}
            increaseLike={increaseLike}
            deleteBlog={deleteBlog}
            currentUser={user}
          />
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} className='error' />

      <Notification message={notificationMessage} className='notification' />

      {user === null ? loginForm() : <div>{blogForm()}</div>}
    </div>
  )
}

export default App
