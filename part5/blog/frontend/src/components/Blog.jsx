import { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [viewInfo, setViewInfo] = useState(false)
  const [btnLabel, setBtnLabel] = useState('View')

  const infoBlog = () => {
    if (viewInfo) {
      return (
        <div className='blogInfo'>
          <p>URL: <a href=''>{blog.url}</a></p>
          <div className='likes'>
            <p>Likes: {blog.likes}</p>
            <button className='likeButton' onClick={() => handleLike(blog)}>Like</button>
          </div>
          <p>User: {blog.user.name}</p>
        </div>
      )
    } else {
      return
    }
  }

  const handleViewBtn = () => {
    setViewInfo(!viewInfo)
    setBtnLabel(viewInfo ? 'View' : 'Hide')
  }

  return (
    <div>
      <div className='blogTitle'>
        <p>{blog.title} - {blog.author}</p>
      </div>
      {infoBlog()}
      <button onClick={handleViewBtn} className='viewButton'>{btnLabel}</button>
    </div>
  )
}

export default Blog
