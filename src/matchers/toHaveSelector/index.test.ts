import { testWrapper } from "../tests/utils"

import toHaveSelector from '.'

describe("toHaveSelector", () => {
  afterEach(async () => {
    await page.evaluate(() => document.body.innerHTML = "")
  })
  it("positive", async () => {
    await page.evaluate(() => {
      document.write(`<div id="foobar">Bar</div>`)
    })
    expect(testWrapper(await toHaveSelector(page, "#foobar"))).toBe(true)
  })
  it("negative", async () => {
    expect(testWrapper(await toHaveSelector(page, "#foobar"))).toThrowError()
  })
  describe("timeout", () => {
    it("positive: should have a timeout of 1 second per default", async () => {
      setTimeout(async () => {
        await page.evaluate(() => {
          document.write(`<div id="foobar">Bar</div>`)
        })
      }, 500)
      expect(testWrapper(await toHaveSelector(page, "#foobar"))).toBe(true)
    })
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      expect(testWrapper(await toHaveSelector(page, "#foobar"))).toThrowError()
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})