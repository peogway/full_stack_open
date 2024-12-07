import BlogView from './BlogView'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link, Routes, Route } from 'react-router-dom'

import blogService from '../services/blogs'

const BlogList = ({ currentUser }) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  const blogs = result.data

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList

