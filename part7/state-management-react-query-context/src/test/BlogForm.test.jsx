import BlogForm from '../components/BlogForm'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('Blog form works well', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  const { container } = render(<BlogForm createBlog={createBlog}/>)

  const inputs = screen.getAllByRole('textbox')
  const createButton = container.querySelector('.btn-create')

  await user.type(inputs[0], 'new blog')
  await user.type(inputs[1], 'mock user')
  await user.type(inputs[2], 'https://mock-user.com/blog-new')

  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('new blog')
  expect(createBlog.mock.calls[0][0].author).toBe('mock user')
  expect(createBlog.mock.calls[0][0].url).toBe('https://mock-user.com/blog-new')
})