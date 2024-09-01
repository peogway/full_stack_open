import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import { useNotiDispatch, useNotiValue } from './NotificationContext'
import { setNoti } from '../notificationHelper'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotiDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNoti(
        notificationDispatch,
        `anecdote '${newAnecdote.content}' added`,
        5
      )
    },
    onError: () => {
      setNoti(
        notificationDispatch,
        'too short anecdote, must have length 5 or more',
        5
      )
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

