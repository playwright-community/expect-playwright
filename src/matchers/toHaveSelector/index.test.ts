import { testWrapper } from "../tests/utils"

import toHaveSelector from '.'

describe("toHaveSelector", () => {
  afterEach(async () => {
    await page.evaluate(() => document.body.innerHTML = "")
  })
  describe("selector", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">Bar</div>`)
      })
      expect(testWrapper(await toHaveSelector(page, "#foobar"))).toBe(true)
    })
    it("negative", async () => {
      expect(testWrapper(await toHaveSelector(page, "#foobar"))).toThrowError()
    })
  })
})