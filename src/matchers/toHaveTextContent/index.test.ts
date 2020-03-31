import "../../../"

import playwright from 'playwright-chromium'

describe("toHaveTextContent", () => {
  it("should be there", async () => {
    const browser = await playwright.chromium.launch()
    const page = await browser.newPage()
    await page.goto("https://github.com/microsoft/playwright")
    await expect(page).toHaveTextContent("#readme h1", "Playwright")
    await browser.close()
  })
})