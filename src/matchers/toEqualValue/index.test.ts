import { testWrapper } from "../tests/utils"

import toEqualValue from '.'

describe("toEqualValue", () => {
  afterEach(async () => {
    await page.setContent('')
  })
  describe("selector", () => {
    it("positive", async () => {
      await page.setContent(`<input id="foobar" value="bar"/>`)
      const result = await toEqualValue(page, "#foobar", "bar")
      expect(result.pass).toBe(true)
      expect(result.message()).toMatchSnapshot()
    })
    it("negative", async () => {
      await page.setContent(`<input id="foobar" value="bar"/>`)
      expect(testWrapper(await toEqualValue(page, "#foobar", "not-existing"))).toThrowErrorMatchingSnapshot()
    })
  })
  describe("element", () => {
    it("positive", async () => {
      await page.setContent(`<input id="foobar" value="bar"/>`)
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      expect(testWrapper(await toEqualValue(element!, "bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.setContent(`<input id="foobar" value="bar"/>`)
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      expect(testWrapper(await toEqualValue(element!, "not-existing"))).toThrowErrorMatchingSnapshot()
    })
  })
  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      expect(testWrapper(await toEqualValue(page, "#foobar", "bar", {
        timeout: 1 * 1000
      }))).toThrowErrorMatchingSnapshot()
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})