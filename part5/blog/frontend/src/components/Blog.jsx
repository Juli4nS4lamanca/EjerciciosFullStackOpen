import { useState } from "react"
import BtnLike from "./BtnLike"

const Blog = ({ blog, setBlogs }) => {
  const [viewInfo, setViewInfo] = useState(false)
  const [btnLabel, setBtnLabel] = useState("View")

  const infoBlog = () => {
    if (viewInfo) {
      return (
        <div className="blogInfo">
          <p>Author: {blog.author}</p>
          <p>
            URL: <a href="">{blog.url}</a>
          </p>
          <div className="likes">
            <p>Likes: {blog.likes}</p>
            <BtnLike blog={blog} setBlogs={setBlogs} />
          </div>
          <p>User: {blog.user.name}</p>
        </div>
      )
    } else {
      return
    }
  }

  const handleViewBtn = () => {
    setViewInfo(!viewInfo);
    setBtnLabel(viewInfo ? "View" : "Hide");
  }

  return (
    <div>
      {blog.title}
      {infoBlog()}
      <button onClick={handleViewBtn}>{btnLabel}</button>
    </div>
  )
}

export default Blog
