import "../../../"

import '../index'

import playwright, { Page, Browser } from 'playwright-chromium'

describe("toContainTextContent", () => {
  let page: Page
  let browser: Browser;
  beforeAll(async () => {
    browser = await playwright.chromium.launch({
      headless: false
    })
  })
  afterAll(async () => {
    await browser.close()
  })
  afterEach(async () => {
    await page.close()
  })
  beforeEach(async () => {
    page = await browser.newPage()
  })
  it("should be able to test positive for a selector", async () => {
    await page.evaluate(() => {
      document.write(`<div id="foobar">Bar</div>`)
    })
    await expect(page).toContainTextContent("#foobar", "Bar")
  })
  it("should be able to test negatiive for a selector", async () => {
    await page.evaluate(() => {
      document.write(`<div id="foobar">Bar</div>`)
    })
    await expect(
      expect(page).toContainTextContent("#foobar", "not-existing")
    ).rejects.toThrowError()
  })
  it("should be able to test positive for an element", async () => {
    await page.evaluate(() => {
      document.write(`<div id="foobar">Bar</div>`)
    })
    const element = await page.$("#foobar")
    await expect(element).toContainTextContent("Bar")
  })
  it("should be able to test negatiive for an element", async () => {
    await page.evaluate(() => {
      document.write(`<div id="foobar">Bar</div>`)
    })
    const element = await page.$("#foobar")
    await expect(
      expect(element).toContainTextContent("not-existing")
    ).rejects.toThrowError()
  })
})