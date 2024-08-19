import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog, increaseLike, deleteBlog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  const [detailVisible, setDetailVisible] = useState(false)
  const [labelBtn, setLabelBtn] = useState('view')

  const detailShow = { display: detailVisible ? '' : 'none' }

  const toggleVisibility = () => {
    detailVisible ? setLabelBtn('view') : setLabelBtn('hide')
    setDetailVisible(!detailVisible)
  }

  const btnRemoveShow = {
    display: currentUser.username === blog.user.username ? '' : 'none',
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} className='btn visibility-btn'>
        {labelBtn}
      </button>
      <div style={detailShow}>
        <a href='#'>{blog.url}</a>
        <br />
        likes {blog.likes}
        <button className='btn like-btn' onClick={() => increaseLike(blog)}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        <button
          style={btnRemoveShow}
          className='remove-btn'
          onClick={() => deleteBlog(blog)}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
