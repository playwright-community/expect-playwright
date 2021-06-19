import toEqualText from "."
import { assertSnapshot } from "../tests/utils"

expect.extend({ toEqualText })

describe("toEqualText", () => {
  afterEach(async () => {
    await page.setContent("")
  })
  describe("selector", () => {
    it("positive frame", async () => {
      await page.setContent(`<iframe src="https://example.com"></iframe>`)
      const handle = await page.$("iframe")
      const iframe = await handle?.contentFrame()
      await expect(handle).toEqualText("h1", "Example Domain")
      await expect(iframe).toEqualText("h1", "Example Domain")
    })
    it("positive", async () => {
      await page.setContent(`<div id="foobar">Bar</div>`)
      await expect(page).toEqualText("#foobar", "Bar")
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      await assertSnapshot(() => expect(page).toEqualText("#foobar", "Bar"))
    })
    describe("with 'not' usage", () => {
      it("positive in frame", async () => {
        await page.setContent(`<iframe src="https://example.com"></iframe>`)
        const handle = await page.$("iframe")
        const iframe = await handle?.contentFrame()
        await expect(handle).not.toEqualText("h1", "Foo")
        await expect(iframe).not.toEqualText("h1", "Foo")
      })
      it("positive", async () => {
        await page.setContent(`<div id="foobar">Bar</div>`)
        await expect(page).not.toEqualText("#foobar", "Foo")
      })
      it("negative", async () => {
        await page.setContent(`<div id="foobar">Bar</div>`)
        await assertSnapshot(() =>
          expect(page).not.toEqualText("#foobar", "Bar")
        )
      })
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
        await assertSnapshot(() =>
          expect(page).toEqualText("#foobar", "Bar", { timeout: 1 * 1000 })
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
      await expect(element!).toEqualText("Bar")
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBeNull()
      await assertSnapshot(() => expect(element!).toEqualText("not-existing"))
    })
  })
  describe("page", () => {
    it("positive", async () => {
      await page.setContent(`<body><div>Bar</div></body>`)
      await expect(page).toEqualText("Bar")
    })
    it("negative", async () => {
      await page.setContent(`<body><div>zzzBarzzz</div></body>`)
      await assertSnapshot(() => expect(page).toEqualText("not-existing"))
    })
  })
})
