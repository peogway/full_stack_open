import Blog from './Blog'

const BlogList = ({ blogs, increaseLike, deleteBlog, currentUser }) => {
  return blogs.map((blog) => (
    <div key={blog.id}>
      <Blog
        blog={blog}
        increaseLike={increaseLike}
        deleteBlog={deleteBlog}
        currentUser={currentUser}
      />
    </div>
  ))
}

export default BlogList

