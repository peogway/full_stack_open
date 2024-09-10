import { useEffect, useRef } from 'react'

import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog } from './reducers/blogReducer'
import { setNotification, setError } from './reducers/notiReducer'
import { setUserFn, rmUserFn } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notiReducer)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUserFn(user))
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <div>
      <LoginForm />
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(rmUserFn())
  }

  const crtBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createNewBlog(blog))
    dispatch(
      setNotification(`a new blog ${blog.title} by ${blog.author} added`, 5)
    )
  }

  const blogForm = () => (
    <div className='blog-list'>
      <p>
        {user.username} logged in
        <button className='btn' onClick={handleLogout}>
          logout
        </button>
      </p>
      <br />

      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm createBlog={crtBlog}></BlogForm>
      </Togglable>

      <BlogList currentUser={user} />
    </div>
  )

  return (
    <div>
      <Notification message={notification.error} className='error' />

      <Notification message={notification.noti} className='notification' />
      <h1>Blog App</h1>

      {user === null ? loginForm() : <div>{blogForm()}</div>}
    </div>
  )
}

export default App

