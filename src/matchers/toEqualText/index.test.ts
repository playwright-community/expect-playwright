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
      const result = await toEqualText(page, "#foobar", "Bar")
      expect(result.pass).toBe(true)
      expect(result.message()).toMatchSnapshot()
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      expect(testWrapper(await toEqualText(page, "#foobar", "not-existing"))).toThrowErrorMatchingSnapshot()
    })
    describe("timeout", () => {
      it("positive: should have a timeout of 1 second per default", async () => {
        setTimeout(async () => {
          await page.evaluate(() => {
            document.write(`<div id="foobar">Bar</div>`)
          })
        }, 500)
        expect(testWrapper(await toEqualText(page, "#foobar", "Bar"))).toBe(true)
      })
      it("should throw an error after the timeout exceeds", async () => {
        const start = new Date().getTime()
        expect(testWrapper(await toEqualText(page, "#foobar", "Bar"))).toThrowErrorMatchingSnapshot()
        const duration = new Date().getTime() - start
        expect(duration).toBeLessThan(1500)
      })
    })
  })
  describe("element", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">Bar</div>`)
      })
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      expect(testWrapper(await toEqualText(element!, "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      expect(testWrapper(await toEqualText(element!, "not-existing"))).toThrowError()
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