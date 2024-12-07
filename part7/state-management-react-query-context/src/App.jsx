import { useEffect, useRef, useState } from 'react'

import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import User from './components/User'
import UserList from './components/UserList'
import BlogView from './components/BlogView'
import { useNotiValue } from './contexts/NotificationContext'
import { useUserValue, useUserDispatch } from './contexts/UserContext'
import { useBlogsValue, useBlogsDispatch } from './contexts/BlogsContext'
import {
  Link,
  Routes,
  Route,
  useMatch,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom'
import blogs from './services/blogs'
import axios from 'axios'
import Blog from './components/Blog'
import Home from './components/Home'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

const App = () => {
  const blogFormRef = useRef()
  const navigate = useNavigate()
  const notification = useNotiValue()
  const userDispatch = useUserDispatch()
  const [users, setUsers] = useState(null)
  const [blog, setBlog] = useState(null)
  // const queryClient = useQueryClient()
  // const blogs = queryClient.getQueryData('blogs')
  const blogs = useBlogsValue()

  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const currentPath = location.pathname

  const blogsDispatch = useBlogsDispatch()

  const likeMutation = useMutation({
    mutationFn: blogService.incLike,
    onSuccess: () => setBlog({ ...blog, likes: (blog.likes += 1) }),
  })
  const dltMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => navigate('/'),
  })

  const like = (blog) => {
    likeMutation.mutate(blog)
  }

  const dltBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dltMutation.mutate(blog.id)
    }
  }

  const matchUser =
    userMatch && users
      ? users.find((user) => {
          return String(user.id) === userMatch.params.id
        })
      : null

  useEffect(() => {
    if (blogMatch && blogs) {
      const foundBlog = blogs.find(
        (blog) => String(blog.id) === blogMatch.params.id
      )
      setBlog(foundBlog || null)
    }
  }, [blogMatch, blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', payload: user })
    }
    const fetchData = async () => {
      try {
        const usersData = await axios.get('http://localhost:3001/api/users')
        const blogsData = await blogService.getAll()

        blogsDispatch({ type: 'SET_BLOG', payload: blogsData })
        setUsers(usersData.data)
      } catch (error) {
        console.error('Error fetching data', error)
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchData()
  }, [userDispatch])

  const user = useUserValue()

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div className='container'>
      <Notification message={notification.error} className='error' />

      <Notification message={notification.noti} className='notification' />
      <h1>Blog App</h1>

      {currentPath !== '/login' && user ? <Home user={user} /> : <div></div>}

      <Routes>
        <Route
          path='/'
          element={
            !user ? (
              <Navigate replace to='/login' />
            ) : (
              <Blogs blogFormRef={blogFormRef} user={user} />
            )
          }
        />
        <Route path='/users/*' element={<UserList users={users} />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/users/:id' element={<User user={matchUser} />} />
        <Route
          path='/blogs/:id'
          element={
            <BlogView
              blog={blog}
              incLikes={like}
              dltBlog={dltBlog}
              currentUser={user}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App

