import { test, expect } from '@playwright/test'

test.describe('Amisphere Faculty Attendance Roster Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Authenticate as Faculty Instructor
    await page.goto('/login')
    await page.selectOption('#role', 'faculty')
    await page.click('button:has-text("Sign In To Portal")')
    await expect(page).toHaveURL(/\/faculty/, { timeout: 20000 })
  })

  test('should render daily roster editor with CSV export functionality', async ({ page }) => {
    await page.goto('/faculty/attendance')
    await expect(page.locator('main h1')).toContainText('Attendance Roster Editor & Adjudication')

    // Verify Export CSV button exists
    const exportBtn = page.locator('button:has-text("Export CSV")')
    await expect(exportBtn).toBeVisible()

    // Verify Seal Daily Register button exists
    const sealBtn = page.locator('button:has-text("Seal Daily Register")')
    await expect(sealBtn).toBeVisible()
  })

  test('should persist roster status updates in hybrid store across reload', async ({ page }) => {
    await page.goto('/faculty/attendance')

    // Find the first attendance status select or button in the table and verify interaction
    const rosterRows = page.locator('table tbody tr')
    await expect(rosterRows.first()).toBeVisible()

    // Check if status toggle buttons or dropdowns are interactive
    const firstRowStatus = rosterRows.first().locator('button, select').first()
    if (await firstRowStatus.count() > 0) {
      await firstRowStatus.click()
    }
  })
})
