const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog App', () => {

  beforeEach(async ({ page, request }) => {
    
    await request.post('http:localhost:3003/api/testing/reset')

    await request.post('http:localhost:3003/api/users', {        
        data:{
          username: 'ekkran',
          name: 'elias',
          password:'qweasf'
        }
    })

    await request.post('http:localhost:3003/api/users', {        
      data:{
        username: 'juancho',
        name: 'juan',
        password:'leroy'
      }
  })
    
    await page.goto('http://localhost:5173')
  })

  test('Login form is open', async ({ page }) => {
      
    const locator = await page.getByText('Log in to app')
    await expect(locator).toBeVisible()
  })  

  describe('Login', () => {
    test('succeeds with correct credentials', async ({page}) => {
      await page.getByTestId('username').fill('ekkran')
      await page.getByTestId('password').fill('qweasf')

      await page.getByRole('button', { name: 'login'}).click()

      await expect(page.getByText('elias logged in')).toBeVisible()

    })

    test('fails with wrong credentials', async ({page}) => {
      await page.getByTestId('username').fill('ekkran')
      await page.getByTestId('password').fill('malapassword')

      await page.getByRole('button', { name: 'login'}).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })

  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('ekkran')
      await page.getByTestId('password').fill('qweasf')

      await page.getByRole('button', { name: 'login'}).click()
    })
  
    test('a new blog can be created', async ({ page }) => {

      await page.getByRole('button', { name: 'Add new' }).click()

      await page.getByPlaceholder('title').fill('A blog')
      await page.getByPlaceholder('author').fill('An author')
      await page.getByPlaceholder('url').fill('www.example.com')

      await page.getByRole('button', { name: 'Add' }).click()

      await expect(page.getByText('A blog showAn author')).toBeVisible()
    })

    describe('When a blog exists', async () => {

      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'Add new' }).click()

        await page.getByPlaceholder('title').fill('A blog')
        await page.getByPlaceholder('author').fill('An author')
        await page.getByPlaceholder('url').fill('www.example.com')

        await page.getByRole('button', { name: 'Add' }).click()
      })

      test('blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        await page.getByRole('button', { name: 'likes' }).click()
  
        await expect(page.getByText('1')).toBeVisible()
      })

      test('blog can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
  
        await expect(page.getByText('A blog showAn author')).not.toBeVisible()
      })

      test('blog can not be removed by another user', async ({ page }) => {
        await page.getByRole('button', { name:'Log Out' }).click()

        await page.getByTestId('username').fill('juancho')
        await page.getByTestId('password').fill('leroy')

        await page.getByRole('button', { name: 'login'}).click()
        await page.getByRole('button', { name: 'show' }).click()

        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })

      test('blog list ordered by most likes', async ({ page }) => {       

        await page.getByPlaceholder('title').fill('A liked blog')
        await page.getByPlaceholder('author').fill('A liked author')
        await page.getByPlaceholder('url').fill('www.example.com')

        await page.getByRole('button', { name: 'Add' }).click()        

        const blogs = await page.getByTestId('blog').all()

        await blogs[1].getByRole('button', { name: 'show' }).click()
        await blogs[1].getByRole('button', { name: 'likes' }).click()
        await blogs[1].getByRole('button', { name: 'likes' }).click() 

        const ordered = await page.getByTestId('blog').all()

        await expect(ordered[0].getByText('A liked blog')).toBeVisible()
      })
      
    })
  })

})

