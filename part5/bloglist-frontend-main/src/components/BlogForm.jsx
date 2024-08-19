import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blog = { title, author, url }
    createBlog(blog)
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div className='title'>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className='author'>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <div className='url'>
            url:
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
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
