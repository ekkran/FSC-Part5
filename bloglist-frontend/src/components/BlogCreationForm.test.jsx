import { render, screen } from '@testing-library/react'
import BlogCreationForm from './BlogCreationForm'
import { beforeEach, describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'



describe('blog form', () => {

  let createBlog
  let user
  let container
  beforeEach(() => {
    createBlog = vi.fn()
    user = userEvent.setup()

    container = render(<BlogCreationForm createBlog={createBlog} />).container
  })

  test('form input', async () => {
    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')

    const button = screen.getByText('Add')

    await user.type(titleInput, 'A Tittle')
    await user.type(authorInput, 'An Author')
    await user.type(urlInput, 'www.example.com')
    
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)    
    expect(createBlog.mock.calls[0][0].title).toBe('A Tittle')
    expect(createBlog.mock.calls[0][0].author).toBe('An Author')
    expect(createBlog.mock.calls[0][0].url).toBe('www.example.com')

  })
})