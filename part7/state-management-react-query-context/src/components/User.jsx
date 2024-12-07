import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) return <div>loading data...</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <br />
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User

