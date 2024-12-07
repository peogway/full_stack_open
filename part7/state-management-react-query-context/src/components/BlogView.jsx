import Comments from './Comments'
import axios from 'axios'
import { useState } from 'react'
import blogService from '../services/blogs'

const BlogView = ({ incLikes, blog, currentUser, dltBlog }) => {
  if (!blog) return <div>loading data...</div>
  const btnRemoveShow = {
    display: currentUser.username === blog.user.username ? '' : 'none',
  }
  const [comments, setComments] = useState(blog.comments)

  const addComment = async (comment) => {
    const res = await axios.post(
      `http://localhost:3001/api/blogs/${blog.id}/comments`,
      {...blog, comments: blog.comments.concat(comment), user: blog.user.id },{
        headers: { Authorization: blogService.getToken() },
      }
    )
    console.log(res.data);
    
    setComments(comments.concat(res.data.comments))
  }
  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href='#'>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={() => incLikes(blog)}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <button
        style={btnRemoveShow}
        className='remove-btn'
        onClick={() => dltBlog(blog)}
      >
        delete
      </button>

      <Comments comments={comments} addComment={addComment} />
    </div>
  )
}

export default BlogView

