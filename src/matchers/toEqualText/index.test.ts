import { testWrapper } from "../tests/utils"

import toEqualText from '.'

expect.extend({ toEqualText })

describe("toEqualText", () => {
  afterEach(async () => {
    await page.setContent('')
  })
  describe.only("selector", () => {
    it("positive frame", async () => {
      await page.setContent(`<iframe src="https://example.com"></iframe>`)
      const iframe = await page.$("iframe")
      await expect(iframe!).toEqualText('h1', 'Example Domain')
    })
    it("positive", async () => {
      await page.setContent(`<div id="foobar">Bar</div>`)
      await expect(page).toEqualText("#foobar", "Bar")
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      await expect(() => expect(page).toEqualText("#foobar", "not-existing")).rejects.toThrowErrorMatchingSnapshot()
    })
    describe("timeout", () => {
      it("positive: should be able to use a custom timeout", async () => {
        setTimeout(async () => {
          await page.setContent(`<div id="foobar">Bar</div>`)
        }, 500)
        await expect(page).toEqualText("#foobar", "Bar")
      })
      it("should throw an error after the timeout exceeds", async () => {
        const start = new Date().getTime()
        await expect(() => expect(page).toEqualText("#foobar", "Bar", {
          timeout: 1 * 1000
        })).rejects.toThrowErrorMatchingSnapshot()
        const duration = new Date().getTime() - start
        expect(duration).toBeLessThan(1500)
      })
    })
  })
  describe("element", () => {
    it("positive", async () => {
      await page.setContent(`<div id="foobar">Bar</div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBeNull()
      await expect(element!).toEqualText("Bar")
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBeNull()
      await expect(() => expect(element!).toEqualText("not-existing")).rejects.toThrowError()
    })
  })
  describe("page", () => {
    it("positive", async () => {
      await page.setContent(`<body><div>Bar</div></body>`)
      await expect(page).toEqualText("Bar")
    })
    it("negative", async () => {
      await page.setContent(`<body><div>zzzBarzzz</div></body>`)
      await expect(() => expect(page).toEqualText("not-existing")).rejects.toThrowError()
    })
  })
})
