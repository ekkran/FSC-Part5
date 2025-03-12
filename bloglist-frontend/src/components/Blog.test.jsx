import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('Blog component', () => {

  let blog 
  const mockHandler = vi.fn()
  const blogData = {
    'title':'My third blog',
    'author':'anonymous',
    'url':'http://localhost/blogs/my-first-blog',
    'likes':0
  }

  beforeEach(() => {
    blog = render(<Blog blog={blogData} like={mockHandler} />).container
  })

  test('renders content', () => {
    
    const title = screen.getByText('My third blog')
    expect(title).toBeDefined()
  
    const author = screen.getByText('anonymous')
    expect(author).toBeDefined()
  
    const hiddenData = blog.querySelector('.hiddenContent')
    expect(hiddenData).toBeNull()
    
  })

  test('show/hide button', async () => {
    
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = blog.querySelector('.hiddenContent')
    expect(div).toBeDefined()
    
  })

  test('click likes 2 times', async () => {
    
    const user = userEvent.setup()

    const showButton = screen.getByText('show')
    await user.click(showButton)

    const button = screen.getByText('likes')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})



