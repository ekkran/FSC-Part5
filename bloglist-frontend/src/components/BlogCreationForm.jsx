import { useState } from 'react'

const BlogCreationForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreation = () => {
    const newBlog = {
      title,
      author,
      url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog(newBlog)
  }

  return(
    <form>
      <div>
        title
        <input type='text' value={title} name='Title' 
        onChange={({ target }) => setTitle(target.value)} placeholder='title'/>
      </div>
      <div>
        author
        <input type='text' value={author} name='Author' 
        onChange={({ target }) => setAuthor(target.value)} placeholder='author'/>
      </div>
      <div>
        url
        <input type='text' value={url} name='Url' 
        onChange={({ target }) => setUrl(target.value)} placeholder='url'/>
      </div>
      <button type='button' onClick={handleCreation}>Add</button>
    </form>
  )
}

export default BlogCreationForm