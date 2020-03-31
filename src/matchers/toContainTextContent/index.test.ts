/// <reference types="jest-playwright-preset" />

describe("toContainTextContent", () => {
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