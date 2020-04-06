import { testWrapper } from "../tests/utils"

import toHaveText from '.'

describe("toHaveText", () => {
  afterEach(async () => {
    await page.evaluate(() => document.body.innerHTML = "")
  })
  describe("selector", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      const result = await toHaveText(page, "#foobar", "Bar")
      expect(testWrapper(result)).toBe(true)
      expect(result.message()).toMatchSnapshot()
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      expect(testWrapper(await toHaveText(page, "#foobar", "not-existing"))).toThrowErrorMatchingSnapshot()
    })
  })
  describe("element", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      expect(testWrapper(await toHaveText(element!, "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      expect(testWrapper(await toHaveText(element!, "not-existing"))).toThrowErrorMatchingSnapshot()
    })
  })
  describe("page", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<body><div>zzzBarzzz</div></body>`)
      })
      expect(testWrapper(await toHaveText(page, "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<body><div>zzzBarzzz</div></body>`)
      })
      expect(testWrapper(await toHaveText(page, "not-existing"))).toThrowErrorMatchingSnapshot()
    })
  })
  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      expect(testWrapper(await toHaveText(page, "#foobar", "bar"))).toThrowErrorMatchingSnapshot()
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})