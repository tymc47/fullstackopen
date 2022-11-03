import { useState } from "react"

const Blog = ({ blog, updateLike, showRemove, removeBlog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const hideWithDetails = { display: showDetails ? 'none' : '' }
  const showWithDetails = { display: showDetails ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const removeBtnStyle = {
    display: showRemove ? "" : 'none'
  }

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}   
        <button style={hideWithDetails} onClick={toggleShowDetails}>show</button>
        <button style={showWithDetails} onClick={toggleShowDetails}>hide</button>
      </div>
      <div style={showWithDetails}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} 
          <button onClick={ () => updateLike(blog) }>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button style={removeBtnStyle} onClick={ () => removeBlog(blog) }>remove</button>
      </div>
    </div>  

  )
}

export default Blog