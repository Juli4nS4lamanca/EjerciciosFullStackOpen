import Blog from './Blog'

const RenderBlogs = ({ blogs, user, handleDelete, handleLike }) => {
  const blogsRender = () =>
    [...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => {
        const creatorId = blog.user.id || blog.user._id || blog.user
        const loggerUserId = user.id || user._id
        return (
          <div key={blog.id} className="blog">
            <Blog blog={blog} handleLike={handleLike} />
            {creatorId.toString() === loggerUserId.toString() ?
              <button className='deleteButton' onClick={() => handleDelete(blog)}>Delete</button>
              : null}
          </div>
        )
      })
  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      {blogsRender()}
    </>
  )
}

export default RenderBlogs
