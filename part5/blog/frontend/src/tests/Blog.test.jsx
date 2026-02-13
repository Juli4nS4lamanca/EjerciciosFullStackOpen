import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const blog = {
  title: 'New Blog',
  author: 'Atem99',
  url: 'www.newBlog.com',
  likes: 1,
  user: {
    name: 'Atem'
  }
}

test('Render title', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blogTitle')

  expect(screen.queryByText(blog.url)).toBeNull()

  expect(div).toHaveTextContent(
    `${blog.title} - ${blog.author}`
  )

})

test('Clicking view button', async () => {

  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)
  const div = container.querySelector('.blogInfo')

  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(`Likes: ${blog.likes}`)

})

test('Cliking the button like', async () => {

  const mockHandler = vi.fn()
  render(<Blog blog={blog} handleLike={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})