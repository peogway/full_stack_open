import { useField } from '../hooks/hook'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

import { useNotiDispatch } from '../contexts/NotificationContext'

const BlogForm = ({ toggleVisibility }) => {
  const { remove: rmTitle, ...title } = useField('text')
  const { remove: rmAuthor, ...author } = useField('text')
  const { remove: rmUrl, ...url } = useField('text')
  const notiDispatch = useNotiDispatch()
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.addBlog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] }),
  })
  const addBlog = (event) => {
    event.preventDefault()
    const blog = { title: title.value, author: author.value, url: url.value }
    newBlogMutation.mutate(blog)
    toggleVisibility()
    notiDispatch({
      type: 'NEW_NOTI',
      payload: `a new blog ${blog.title} by ${blog.author} added`,
    })
    setTimeout(
      () =>
        notiDispatch({
          type: 'RM_NOTI',
        }),
      5000
    )

    rmTitle()
    rmAuthor()
    rmUrl()
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div className='title'>
          title:
          <input data-testid='title' {...title} />
        </div>

        <div className='author'>
          author:
          <input data-testid='author' {...author} />
          <div className='url'>
            url:
            <input data-testid='url' {...url} />
          </div>
          <button type='submit' className='btn btn-create'>
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm

