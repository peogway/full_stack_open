import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleSubmit}>
        <div className='username'>
          username:
          <input value={props.username} onChange={props.handleUsernameChange} />
        </div>
        <div className='password'>
          password:
          <input
            type='password'
            value={props.password}
            onChange={props.handlePasswordChange}
          />
        </div>
        <button className='btn submitBtn' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
