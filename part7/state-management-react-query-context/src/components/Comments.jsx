import { useField } from '../hooks/hook'

const Comments = ({ comments, addComment }) => {
  const { remove: rmComment, ...comment } = useField('text')
  const handleAddComment = (e) => {
    e.preventDefault()
    addComment(comment.value)
    rmComment()
  }
  return (
    <div>
      <h3>comments</h3>
      <input {...comment} name='comment' />
      <button onClick={handleAddComment} style={{ margin: 5 }}>
        add comment
      </button>
      <ul>
        {comments.map((comment, pos) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments

