import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, user }) => {

  const [showDetails, setShowDetails] = useState(false)
  const likePost = async () => {
    const likes = blog.likes + 1
    like(likes, blog.id)
  }
  const removePost = () => {
    remove(blog.id, blog.title, blog.author)
  }
  return (
    <div className='blog' data-testid='blog'>
      {blog.title} <button type="button" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
      {
        showDetails ?
          <div className='hiddenContent'>
            {blog.url}
            <br />
            {blog.likes} <button type="button" onClick={likePost}>likes</button>
            <br />
            {
            blog.user.username === user.username ? 
            <button type='button' onClick={removePost}>remove</button> 
            : ''
            }
          </div>
          : ''
      }
      <span>{blog.author}</span>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired
  })
}

export default Blog