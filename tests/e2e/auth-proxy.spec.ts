import { test, expect } from '@playwright/test'

test.describe('Amisphere Multi-Role Gatekeeper & Auth Verification', () => {
  test('should redirect unauthenticated users visiting /student to /login', async ({ page }) => {
    await page.goto('/student')
    await expect(page).toHaveURL(/\/login/, { timeout: 20000 })
  })

  test('should login as Student using role selector and route to /student', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h2')).toContainText('Welcome to Amisphere')

    // Select Student Portal
    await page.selectOption('#role', 'student')
    await page.click('button:has-text("Sign In To Portal")')

    await expect(page).toHaveURL(/\/student/, { timeout: 20000 })
    await expect(page.locator('main h1')).toContainText('Prakhar Rai', { timeout: 20000 })
  })

  test('should prevent Student from accessing /admin and redirect back to /student', async ({ page }) => {
    // 1. First sign in as student
    await page.goto('/login')
    await page.selectOption('#role', 'student')
    await page.click('button:has-text("Sign In To Portal")')
    await expect(page).toHaveURL(/\/student/, { timeout: 20000 })

    // 2. Attempt unauthorized visit to /admin
    await page.goto('/admin')
    
    // Proxy gatekeeper should intercept and redirect back to /student
    await expect(page).toHaveURL(/\/student/, { timeout: 20000 })
  })

  test('should allow HOD login and route to /hod', async ({ page }) => {
    await page.goto('/login')
    await page.selectOption('#role', 'hod')
    await page.click('button:has-text("Sign In To Portal")')

    await expect(page).toHaveURL(/\/hod/, { timeout: 20000 })
    await expect(page.locator('main h1')).toContainText('Mishra', { timeout: 20000 })
  })
})
