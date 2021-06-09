import toMatchText from "."
import { assertSnapshot } from "../tests/utils"

expect.extend({ toMatchText })

describe("toMatchText", () => {
  afterEach(async () => {
    await page.setContent("")
  })
  describe("selector", () => {
    it("positive frame", async () => {
      await page.setContent(`<iframe src="https://example.com"></iframe>`)
      const iframe = await page.$("iframe")
      await expect(iframe!).toMatchText("h1", /.*ample Domai.*/)
    })
    it("positive", async () => {
      await page.setContent(`<div id="foobar">Bar</div>`)
      await expect(page).toMatchText("#foobar", /[B|b]ar/)
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      await assertSnapshot(() => expect(page).toMatchText("#foobar", /[b]ar/))
    })
    describe("with 'not' usage", () => {
      it("positive in frame", async () => {
        await page.setContent(`<iframe src="https://example.com"></iframe>`)
        const iframe = await page.$("iframe")
        await expect(iframe!).not.toMatchText("h1", /ab+c/)
      })
      it("positive", async () => {
        await page.setContent(`<div id="foobar">Bar</div>`)
        await expect(page).not.toMatchText("#foobar", /exam.*[1|2]/)
      })
      it("negative", async () => {
        await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
        await assertSnapshot(() =>
          expect(page).toMatchText("#foobar", /not-existing/)
        )
      })
    })
    describe("timeout", () => {
      it("positive: should be able to use a custom timeout", async () => {
        setTimeout(async () => {
          await page.setContent(`<div id="foobar">Bar</div>`)
        }, 500)
        await expect(page).toMatchText("#foobar", /[B|b]ar/)
      })
      it("should throw an error after the timeout exceeds", async () => {
        const start = new Date().getTime()
        await assertSnapshot(() =>
          expect(page).toMatchText("#foobar", /[B|b]ar/, { timeout: 1 * 1000 })
        )
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
      await expect(element!).toMatchText("Bar")
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBeNull()
      await assertSnapshot(() => expect(element!).toMatchText("not-existing"))
    })
  })
  describe("page", () => {
    it("positive", async () => {
      await page.setContent(`<body><div>Bar</div></body>`)
      await expect(page).toMatchText("Bar")
    })
    it("negative", async () => {
      await page.setContent(`<body><div>zzzBarzzz</div></body>`)
      await assertSnapshot(() => expect(page).toMatchText("not-existing"))
    })
  })
})
