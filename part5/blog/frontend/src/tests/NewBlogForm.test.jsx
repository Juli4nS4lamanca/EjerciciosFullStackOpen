import { render, screen } from '@testing-library/react'
import NewBlogForm from '../components/NewBlogForm'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'New Blog',
  author: 'Atem99',
  url: 'www.newBlog.com',
  likes: 1,
  user: {
    name: 'Atem'
  }
}

test('Test form new Blog', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm handleCreateBlog={createBlog} />)

  const inputTitle = screen.getByLabelText(/Title/i)
  const inputURL = screen.getByLabelText(/Url/i)
  const inputAuthor = screen.getByLabelText(/Author/i)
  const button = screen.getByText('Create')

  await user.type(inputTitle, blog.title)
  await user.type(inputURL, blog.url)
  await user.type(inputAuthor, blog.author)
  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)

  /*
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
   */

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: blog.title,
    url: blog.url,
    author: blog.author
  })

})