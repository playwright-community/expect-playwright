import { assertSnapshot } from "../tests/utils"

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
      await page.setContent(`<iframe src="http://localhost:8080">`)
      const handle = await page.$("iframe")
      const iframe = await handle?.contentFrame()
      await expect(handle).toMatchValue("#input-filled", "bar")
      await expect(iframe).toMatchValue("#input-filled", /ar/)
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
        await page.setContent(`<iframe src="http://localhost:8080">`)
        const handle = await page.$("iframe")
        const iframe = await handle?.contentFrame()
        await expect(handle).not.toMatchValue("#input-empty", "bar")
        await expect(iframe).not.toMatchValue("#input-empty", /ar/)
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
