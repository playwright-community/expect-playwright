import { assertSnapshot } from "../tests/utils"

describe("toHaveFocus", () => {
  beforeEach(async () => {
    await jestPlaywright.resetContext()
  })

  describe("selector", () => {
    it("positive", async () => {
      await page.setContent(`<input id="foobar">`)
      await page.keyboard.press("Tab")
      await expect(page).toHaveFocus("#foobar")
    })

    it("positive in frame", async () => {
      await page.setContent('<iframe src="http://localhost:8080">')
      await page.keyboard.press("Tab")

      const handle = page.$("iframe")
      await expect(handle).toHaveFocus("#checkbox-checked")
      await expect(await handle).toHaveFocus("#checkbox-checked")

      const frame = (await handle)?.contentFrame()
      await expect(frame).toHaveFocus("#checkbox-checked")
      await expect(await frame).toHaveFocus("#checkbox-checked")
    })

    it("negative", async () => {
      await page.setContent(`<input id="foo"><input id="bar">`)
      await page.keyboard.press("Tab")
      await assertSnapshot(() => expect(page).toHaveFocus("#bar"))
    })
  })

  describe("element", () => {
    it("positive", async () => {
      await page.setContent(`<input id="foobar">`)
      await page.keyboard.press("Tab")
      const element = page.$("#foobar")
      await expect(element).toHaveFocus()
      await expect(await element).toHaveFocus()
    })

    it("negative", async () => {
      await page.setContent(`<input id="foo"><input id="bar">`)
      await page.keyboard.press("Tab")
      await assertSnapshot(() => expect(page.$("#bar")).toHaveFocus())
    })
  })

  describe("with 'not' usage", () => {
    it("positive", async () => {
      await page.setContent('<input id="foo"><input id="bar">')
      await page.keyboard.press("Tab")
      await expect(page).not.toHaveFocus("#bar")
    })

    it("positive in frame", async () => {
      await page.setContent('<iframe src="http://localhost:8080">')

      const handle = page.$("iframe")
      await expect(handle).not.toHaveFocus("#checkbox-checked")
      await expect(await handle).not.toHaveFocus("#checkbox-checked")

      const frame = (await handle)?.contentFrame()
      await expect(frame).not.toHaveFocus("#checkbox-checked")
      await expect(await frame).not.toHaveFocus("#checkbox-checked")
    })

    it("negative", async () => {
      await page.setContent('<input id="foobar">')
      await page.keyboard.press("Tab")
      await assertSnapshot(() => expect(page).not.toHaveFocus("#foobar"))
    })
  })

  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toHaveFocus("#foobar", { timeout: 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeGreaterThan(1000)
      expect(duration).toBeLessThan(1500)
    })
  })
})
