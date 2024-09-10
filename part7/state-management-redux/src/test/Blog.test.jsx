import Blog from '../components/Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let blog, currentUser, increaseLike, deleteBlog, container

  beforeEach(() => {
    increaseLike = vi.fn()
    deleteBlog = vi.fn()

    blog = {
      title: 'Test Blog',
      author: 'peogway',
      url: 'https://peogway.com/test-blog',
      user: {
        id: '12345',
        username: 'peousername',
        name: 'peoname'
      }
    }

    currentUser = {
      id: '12345',
      username: 'peousername',
      name: 'peoname'
    }
    container = render(<Blog blog={blog} currentUser={currentUser} increaseLike={increaseLike} deleteBlog={deleteBlog}/>).container
  })

  test('Title and author displayed, but not URL or number of likes by default.', async () => {
    const titleElement = screen.getByText('Test Blog', { exact : false })
    const authorElements = screen.getAllByText('peogway', { exact : false })

    expect(titleElement).toBeDefined()
    expect(authorElements[0]).toBeDefined()

    const detail = container.querySelector('.detail')

    expect(detail).toHaveStyle('display: none')
  })

  test('Detail shown when button clicked', async () => {
    const user = userEvent.setup()
    const viewButton = container.querySelector('.visibility-btn')
    await user.click(viewButton)

    const detail = container.querySelector('.detail')
    expect(detail).not.toHaveStyle('display: none')

    const urlElement = screen.getByText('https://peogway.com/test-blog')
    expect(urlElement).toBeDefined()

    const likesElement = screen.getByText('likes', { exact : false })
    expect(likesElement).toBeDefined()
  })

  test('Event handler called twice when like button clicked twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = container.querySelector('.like-btn')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(increaseLike.mock.calls).toHaveLength(2)
  })
})

