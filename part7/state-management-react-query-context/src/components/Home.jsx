import { useUserDispatch } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Home = ({ user }) => {
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()
  const padding = {
    padding: 5,
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    userDispatch({ type: 'RM_USER' })
    navigate('/login')
  }
  return (
    <div className='blog-list'>
      <div>
        <p>
          <Link style={padding} to='/'>
            blogs
          </Link>
          <Link style={padding} to='/users'>
            users
          </Link>
          <br />
          {user.username} logged in
          <button className='btn' onClick={handleLogout}>
            logout
          </button>
        </p>
      </div>
      <br />
    </div>
  )
}

export default Home

