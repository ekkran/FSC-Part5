import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')

  const handleLogout = (event) => {
    event.preventDefault
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleLogin = async (loginInfo) => {
    try {
      const user = await loginService.login(loginInfo)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      console.log(exception)
    }
  }

  const handleBlogAdd = async (newBlog) => {
    const response = await blogService.create(newBlog)

    if(response){
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setInfoMessage(`The blog ${newBlog.title} by ${newBlog.author} was added`)
    }
  }

  const handleLikeBlog = async (likes, id) => {
    const response = await blogService.update(likes, id)
    if(response){
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  const handleRemove = async (id, title, author) => {
    if(window.confirm(`Delete ${title} by ${author}`)){
      const response = await blogService.remove(id)
      if(response){
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      }
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  if(user === null){
    return (
      <div>
        <span>
          {errorMessage}
        </span>
        <h2>Log in to app</h2>
        <LoginForm handleSubmit={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <span>{infoMessage}</span>
      <p>{user.name} logged in</p>
      <button type='button' onClick={handleLogout}>Log Out</button>
      <h2>create new</h2>
      <Togglable buttonLabel='Add new' >
        <BlogCreationForm createBlog={handleBlogAdd} />
      </Togglable>
      <h2>blogs</h2>
      {blogs.sort((x, y) => y.likes - x.likes).map(blog =>
        <Blog key={blog.id} blog={blog} like={handleLikeBlog} remove={handleRemove} user={user}/>
      )}
    </div>
  )
}

export default App