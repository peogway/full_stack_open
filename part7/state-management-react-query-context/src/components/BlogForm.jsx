import { useField } from '../hooks/hook'

const BlogForm = ({ createBlog }) => {
  const { remove: rmTitle, ...title } = useField('text')
  const { remove: rmAuthor, ...author } = useField('text')
  const { remove: rmUrl, ...url } = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = { title: title.value, author: author.value, url: url.value }
    createBlog(blog)
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

