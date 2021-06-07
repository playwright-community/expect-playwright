import { assertSnapshot, testWrapper } from "../tests/utils"
import toHaveFocus from "."

expect.extend({ toHaveFocus })

describe("toHaveFocus", () => {
  afterEach(async () => {
    await page.setContent("")
  })
  it("positive", async () => {
    await page.setContent(`<input id="foobar">`)
    await page.keyboard.press("Tab")
    await expect(page).toHaveFocus("#foobar")
  })
  it("negative: target element don't have focus", async () => {
    await page.setContent(`<input id="foo"><input id="bar">`)
    await page.keyboard.press("Tab")
    await assertSnapshot(() => expect(page).toHaveFocus("#bar"))
  })
  it("negative: target element not found", async () => {
    await page.setContent(`<input id="foo">`)
    await page.keyboard.press("Tab")
    await assertSnapshot(() =>
      expect(page).toHaveFocus("#bar", { timeout: 1000 })
    )
  })
  describe("with 'not' usage", () => {
    it("positive", async () => {
      await page.setContent('<input id="foo"><input id="bar">')
      await page.keyboard.press("Tab")
      await expect(page).not.toHaveFocus("#bar")
    })
    it("negative: target element has focus", async () => {
      await page.setContent('<input id="foobar">')
      await page.keyboard.press("Tab")
      await assertSnapshot(() => expect(page).not.toHaveFocus("#foobar"))
    })
  })
  describe("timeout", () => {
    it("positive: should be able to use a custom timeout", async () => {
      setTimeout(async () => {
        await page.setContent(`<input id="foobar">`)
        await page.keyboard.press("Tab")
      }, 500)
      await expect(page).toHaveFocus("#foobar", { timeout: 1000 })
    })
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toHaveFocus("#foobar", { timeout: 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})
