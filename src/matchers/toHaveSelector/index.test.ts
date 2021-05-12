import { testWrapper } from "../tests/utils"

import toHaveSelector from "."

describe("toHaveSelector", () => {
  afterEach(async () => {
    await page.setContent("")
  })
  it("positive", async () => {
    await page.setContent(`<div id="foobar">Bar</div>`)
    const result = await toHaveSelector(page, "#foobar")
    expect(result.pass).toBe(true)
    expect(result.message()).toMatchSnapshot()
  })
  it("negative", async () => {
    expect(
      testWrapper(
        await toHaveSelector(page, "#foobar", {
          timeout: 1 * 1000,
        })
      )
    ).toThrowError()
  })
  describe("timeout", () => {
    it("positive: should be able to use a custom timeout", async () => {
      setTimeout(async () => {
        await page.setContent(`<div id="foobar">Bar</div>`)
      }, 500)
      expect(
        testWrapper(
          await toHaveSelector(page, "#foobar", {
            timeout: 1 * 1000,
          })
        )
      ).toBe(true)
    })
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      expect(
        testWrapper(
          await toHaveSelector(page, "#foobar", {
            timeout: 1 * 1000,
          })
        )
      ).toThrowError()
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})
