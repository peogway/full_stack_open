import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const navigate = useNavigate()

  const { reset: contentReset, ...contentProps } = useField('')
  const { reset: authorReset, ...authorProps } = useField('')
  const { reset: infoReset, ...infoProps } = useField('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentProps.value,
      author: authorProps.value,
      info: infoProps.value,
      votes: 0,
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button>create</button>
      </form>
      <button
        onClick={() => {
          contentReset()
          authorReset()
          infoReset()
        }}
        style={{ marginTop: 10 }}
      >
        reset
      </button>
    </div>
  )
}

export default CreateNew

