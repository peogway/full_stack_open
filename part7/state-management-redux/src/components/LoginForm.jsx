import { useDispatch } from 'react-redux'
import { setError } from '../reducers/notiReducer'
import { setUserFn } from '../reducers/userReducer'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

import { useField } from '../hooks/hook'

const LoginForm = () => {
  const dispatch = useDispatch()

  const { remove: rmUsername, ...username } = useField('text')
  const { remove: rmPassword, ...password } = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUserFn(user))
      rmUsername()
      rmPassword()
    } catch (exception) {
      dispatch(setError('Wrong Credentials', 5))
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

