import { testWrapper } from "../tests/utils"

import toHaveSelectorCount from '.'

describe("toHaveSelectorCount", () => {
  afterEach(async () => {
    await page.evaluate(() => document.body.innerHTML = "")
  })
  describe("selector", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<div class="foobar"></div><div class="foobar">Bar</div>`)
      })
      const result = await toHaveSelectorCount(page, ".foobar", 2)
      expect(result.pass).toBe(true)
      expect(result.message()).toMatchSnapshot()
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<div class="foobar">Bar</div>`)
      })
      expect(testWrapper(await toHaveSelectorCount(page, ".foobar", 2))).toThrowErrorMatchingSnapshot()
    })
  })
  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      expect(testWrapper(await toHaveSelectorCount(page, ".foobar", 1))).toThrowErrorMatchingSnapshot()
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})
