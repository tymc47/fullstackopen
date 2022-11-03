import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      console.log(user.token)
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({
        type: 'fail',
        content: `${exception.response.data.error}`
      })

      setTimeout(() => {
        setMessage(null)
      }, 3000) 
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addNewBlog = async (newBlog) => {
    console.log(newBlog)
    console.log(user)
    const result  = await blogService.create(newBlog)
    result.user = user
    setBlogs(blogs.concat(result))

    setMessage({
      type: 'success',
      content: `a new blog ${result.title} by ${result.author} added`
    })

    setTimeout(() => {
      setMessage(null)
    }, 3000) 
  }

  const handleLike = async (blogToUpdate) => {
    console.log("handleLike", blogToUpdate)
    const result = await blogService.like(blogToUpdate)
    result.user = { id: blogToUpdate.user.id, name: blogToUpdate.user.name }
    console.log(result)
    setBlogs(blogs.map(blog => blog.id === result.id ? result : blog))
  }

  const handleRemove = async (blogToRemove) => {
    if(!window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) return

    console.log('remove blog', blogToRemove)
    await blogService.remove(blogToRemove)
    setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Message msgObj={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
              <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message msgObj={message} />
      <div> 
        {user.name} logged in 
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable showLabel="new blog" hideLabel="cancel">
        <BlogForm handleNewBlog={addNewBlog}/>
      </Togglable>
      {blogs
        .sort((a , b) => b.likes - a.likes)
        .map(blog => <Blog key={blog.id} blog={blog} updateLike={handleLike} showRemove={user.username === blog.user.username} removeBlog={handleRemove}/>)
      }
    </div>
  )
}

export default App
