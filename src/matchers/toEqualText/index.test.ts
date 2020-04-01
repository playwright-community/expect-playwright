import { testWrapper } from "../tests/utils"

import toEqualText from '.'

describe("toEqualText", () => {
  afterEach(async () => {
    await page.evaluate(() => document.body.innerHTML = "")
  })
  describe("selector", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">Bar</div>`)
      })
      expect(testWrapper(await toEqualText(page, "#foobar", "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      expect(testWrapper(await toEqualText(page, "#foobar", "not-existing"))).toThrowError()
    })
  })
  describe("element", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">Bar</div>`)
      })
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      if (!element) {
        return
      }
      expect(testWrapper(await toEqualText(element, "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      if (!element) {
        return
      }
      expect(testWrapper(await toEqualText(element, "not-existing"))).toThrowError()
    })
  })
  describe("page", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<body><div>Bar</div></body>`)
      })
      expect(testWrapper(await toEqualText(page, "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<body><div>zzzBarzzz</div></body>`)
      })
      expect(testWrapper(await toEqualText(page, "not-existing"))).toThrowError()
    })
  })
})