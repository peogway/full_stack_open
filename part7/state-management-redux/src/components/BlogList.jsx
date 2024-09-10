import Blog from './Blog'
import { setAllBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const BlogList = ({ currentUser }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setAllBlog())
  }, [])

  const blogs = useSelector((state) => state.blogs)

  const like = (blog) => {
    dispatch(likeBlog(blog))
  }

  const dltBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return blogs.map((blog) => (
    <div key={blog.id}>
      <Blog
        blog={blog}
        increaseLike={like}
        deleteBlog={dltBlog}
        currentUser={currentUser}
      />
    </div>
  ))
}

export default BlogList

