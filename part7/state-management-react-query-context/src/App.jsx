import { useEffect, useRef, useState } from 'react'

import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { useNotiValue } from './contexts/NotificationContext'
import { useUserValue, useUserDispatch } from './contexts/UserContext'

const App = () => {
  const blogFormRef = useRef()
  const notification = useNotiValue()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })
    }
  }, [])
  const user = useUserValue()

  const loginForm = () => (
    <div>
      <LoginForm />
    </div>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    userDispatch({ type: 'RM_USER' })
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
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        ></BlogForm>
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

