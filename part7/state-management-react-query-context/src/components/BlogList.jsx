import Blog from './Blog'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import blogService from '../services/blogs'

const BlogList = ({ currentUser }) => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  const likeMutation = useMutation({
    mutationFn: blogService.incLike,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
  const dltMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes)

  const like = (blog) => {
    likeMutation.mutate(blog)
  }

  const dltBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dltMutation.mutate(blog.id)
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

