import { testWrapper } from "../tests/utils"

import toHaveText from '.'

describe("toHaveText", () => {
  afterEach(async () => {
    await page.setContent('')
  })
  describe("selector", () => {
    it("empty positive with page element", async () => {
      await page.setContent(`<div id="foobar"></div>`)
      const result = await toHaveText(page, "#foobar", "", {state: 'attached'})
      expect(result.pass).toBe(true)
      expect(result.message()).toMatchSnapshot()
    })
    it("empty positive with custom element", async () => {
      await page.setContent(`<div id="foobar"></div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      const result = await toHaveText(element!, "")
      expect(result.pass).toBe(true)
      expect(result.message()).toMatchSnapshot()
    })
    it("positive", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      const result = await toHaveText(page, "#foobar", "Bar")
      expect(result.pass).toBe(true)
      expect(result.message()).toMatchSnapshot()
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      expect(testWrapper(await toHaveText(page, "#foobar", "not-existing"))).toThrowErrorMatchingSnapshot()
    })
  })
  describe("element", () => {
    it("positive", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      expect(testWrapper(await toHaveText(element!, "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      expect(testWrapper(await toHaveText(element!, "not-existing"))).toThrowErrorMatchingSnapshot()
    })
  })
  describe("page", () => {
    it("positive", async () => {
      await page.setContent(`<body><div>zzzBarzzz</div></body>`)
      expect(testWrapper(await toHaveText(page, "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.setContent(`<body><div>zzzBarzzz</div></body>`)
      expect(testWrapper(await toHaveText(page, "not-existing"))).toThrowErrorMatchingSnapshot()
    })
  })
  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      expect(testWrapper(await toHaveText(page, "#foobar", "bar", {
        timeout: 1 * 1000
      }))).toThrowErrorMatchingSnapshot()
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})
