import { test, expect } from '@playwright/test';

const baseUrl = 'http://localhost:3000'

test.describe("Sign In", () => {

    test.beforeEach( async ({page}) => {
        await page.goto(`${baseUrl}/login`)
        await page.getByLabel(/username/i).fill('john_doe')
        await page.getByLabel(/password/i).fill('password')

        await page.getByRole('button', {name: /login/i}).click({button: 'left'})

        await page.waitForFunction(() => localStorage.getItem('token') !== null)
        
    })


     test("visit restaurant page", async ({page}) => {
        

        await expect(page.getByText(/bite by bite/i)).toBeVisible()
      
        await page.getByText(/restaurants/i).click({button: 'left'})

        await expect(page.getByText(/our restaurants/i)).toBeVisible()

    })

    test("restaurant lists show show", async ({page}) => {
        await page.goto(`${baseUrl}/restaurants/2`)
        
        await expect(page.getByText(/authentic wood-fired pizzas/i)).toBeVisible()

    })

})

