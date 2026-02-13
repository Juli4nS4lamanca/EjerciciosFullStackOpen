import blogService from '../services/blogs'
const BtnDelete = ({ blog, setBlogs }) => {

  const deleteBlog = async () => {
    const ok = window.confirm(`Desea eliminar el blog "${blog.title}"?`)

    if (!ok) return

    try {
      await blogService.remove(blog.id)
      setBlogs(prev => prev.filter(b => b.id !== blog.id))

    } catch (error) {
      console.error(error)
      alert('Error eliminando el blog ', error)
    }
  }


  return (
    <button onClick={deleteBlog} className="btnDelete">Delete</button>
  )

}

export default BtnDelete