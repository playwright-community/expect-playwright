import { assertSnapshot } from "../tests/utils"

const iframeSrc = `<iframe src="https://interactive-examples.mdn.mozilla.net/pages/tabbed/input-text.html">`

describe("toMatchValue", () => {
  beforeEach(async () => {
    await jestPlaywright.resetContext()
  })

  describe("selector", () => {
    it("positive", async () => {
      await page.setContent(`<input id="foobar" value="bar"/>`)
      await expect(page).toMatchValue("#foobar", "bar")
      await expect(page).toMatchValue("#foobar", /ba/)
    })

    it("positive in frame", async () => {
      await page.setContent(iframeSrc)
      const handle = await page.$("iframe")
      const iframe = await handle?.contentFrame()
      await iframe?.fill("input", "bar")
      await expect(handle).toMatchValue("#name", "bar")
      await expect(iframe).toMatchValue("#name", /ar/)
    })

    it("negative", async () => {
      await page.setContent(`<input id="foobar" value="Bar"/>`)
      await assertSnapshot(() => expect(page).toMatchValue("#foobar", "Baz"))
      await assertSnapshot(() => expect(page).toMatchValue("#foobar", /az$/))
    })

    describe("with 'not' usage", () => {
      it("positive", async () => {
        await page.setContent(`<input id="foobar" value="bar"/>`)
        expect(page).not.toMatchValue("#foobar", "not-existing")
        expect(page).not.toMatchValue("#foobar", /not-existing/)
      })

      it("positive in frame", async () => {
        await page.setContent(iframeSrc)
        const handle = await page.$("iframe")
        const iframe = await handle?.contentFrame()
        await iframe?.fill("input", "bar")
        await expect(handle).toMatchValue("#name", "bar")
        await expect(iframe).toMatchValue("#name", /ar/)
      })

      it("negative", async () => {
        await page.setContent(`<input id="foobar" value="bar"/>`)
        await assertSnapshot(() =>
          expect(page).not.toMatchValue("#foobar", "bar")
        )
        await assertSnapshot(() =>
          expect(page).not.toMatchValue("#foobar", /ba/)
        )
      })
    })
  })

  describe("element", () => {
    it("positive", async () => {
      await page.setContent(`<input id="foobar" value="bar"/>`)
      const element = page.$("#foobar")
      await expect(element).toMatchValue("bar")
      await expect(await element).toMatchValue(/ba/)
    })

    it("negative", async () => {
      await page.setContent(`<input id="foobar" value="bar"/>`)
      const element = await page.$("#foobar")
      await assertSnapshot(() => expect(element).toMatchValue("not-existing"))
      await assertSnapshot(() => expect(element).toMatchValue(/not-existing/))
    })
  })

  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toMatchValue("#foobar", "bar", { timeout: 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})
