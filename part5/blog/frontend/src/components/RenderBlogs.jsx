import Blog from "./Blog"
import BtnDelete from "./BtnDelete"

const RenderBlogs = ({ blogs, user, setBlogs }) => {
  const blogsRender = () =>
    [...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <div key={blog.id} className="blog">
          <Blog blog={blog} setBlogs={setBlogs} />
          {blog.user.id === user.id ? 
          <BtnDelete blog={blog} blogs={blogs} setBlogs={setBlogs} />
        : <></>}
        </div>
      ));
  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      {blogsRender()}
    </>
  )
}

export default RenderBlogs
