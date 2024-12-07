import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

const Blogs = ({ blogFormRef, user }) => {
  return (
    <div>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        ></BlogForm>
      </Togglable>

      <BlogList currentUser={user} />
    </div>
  )
}

export default Blogs

