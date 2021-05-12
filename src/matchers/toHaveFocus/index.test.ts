import { testWrapper } from "../tests/utils"

import toHaveFocus from "."

describe("toHaveFocus", () => {
  afterEach(async () => {
    await page.setContent("")
  })
  it("positive", async () => {
    await page.setContent(`<input id="foobar">`)
    await page.keyboard.press("Tab")
    const result = await toHaveFocus(page, "#foobar")
    expect(result.pass).toBe(true)
    expect(result.message()).toMatchSnapshot()
  })
  it("negative: target element don't have focus", async () => {
    await page.setContent(`<input id="foo"><input id="bar">`)
    await page.keyboard.press("Tab")
    const result = await toHaveFocus(page, "#bar")
    expect(testWrapper(result)).toThrowErrorMatchingSnapshot()
  })
  it("negative: target element not found", async () => {
    await page.setContent(`<input id="foo">`)
    await page.keyboard.press("Tab")
    const result = await toHaveFocus(page, "#bar", {
      timeout: 1 * 1000,
    })
    expect(testWrapper(result)).toThrowErrorMatchingSnapshot()
  })
  describe("timeout", () => {
    it("positive: should be able to use a custom timeout", async () => {
      setTimeout(async () => {
        await page.setContent(`<input id="foobar">`)
        await page.keyboard.press("Tab")
      }, 500)
      expect(
        testWrapper(
          await toHaveFocus(page, "#foobar", {
            timeout: 1 * 1000,
          })
        )
      ).toBe(true)
    })
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      expect(
        testWrapper(
          await toHaveFocus(page, "#foobar", {
            timeout: 1 * 1000,
          })
        )
      ).toThrowError()
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})
