import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNotiDispatch } from '../contexts/NotificationContext'
import { useField } from '../hooks/hook'
import { useUserDispatch } from '../contexts/UserContext'

const LoginForm = () => {
  const { remove: rmUsername, ...username } = useField('text')
  const { remove: rmPassword, ...password } = useField('password')
  const notificationDispatch = useNotiDispatch()
  const userDispatch = useUserDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })

      rmUsername()
      rmPassword()
    } catch (exception) {
      notificationDispatch({
        type: 'NEW_ERROR',
        payload: 'Wrong Credentials',
      })
      setTimeout(() => {
        notificationDispatch({ type: 'RM_ERROR' })
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='username'>
          username:
          <input data-testid='username' {...username} />
        </div>
        <div className='password'>
          password:
          <input data-testid='password' {...password} />
        </div>
        <button className='btn submitBtn' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm

