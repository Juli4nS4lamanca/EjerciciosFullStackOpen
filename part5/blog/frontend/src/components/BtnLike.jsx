import blogService from '../services/blogs'
const BtnLike = ({ blog, setBlogs }) => {

  const addLike = async () => {
    const blogObject = {
      likes: blog.likes + 1,
      ...blog
    }

    try {
      const updateBlog = await blogService.update(blogObject)
      setBlogs(prev => prev.map(b => b.id === blog.id ? updateBlog : b))
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <button onClick={addLike}>Like</button>
  )

}

export default BtnLike