import { assertSnapshot } from "../tests/utils"
import toBeVisible from "."

expect.extend({ toBeVisible })

describe("toBeVisible", () => {
  afterEach(async () => {
    await page.setContent("")
  })
  it("positive", async () => {
    await page.setContent(`<body><input id="foobar" style="visibility:visible"></body>`)
    await expect(page).toBeVisible("#foobar")
  })

  it("positive: handle-element", async () => {
    await page.setContent(`<input id="foobar" style="visibility:visible">`)
    await expect(await page.$('#foobar')).toBeVisible()
  })

  it("negative: target element is not visible", async () => {
    await page.setContent(`<input id="foo" style="visibility:hidden">`)
    await assertSnapshot(async () => expect(await page.$('#foo')).toBeVisible())
  })

  it("negative: handle-element : target element is not visible", async () => {
    await page.setContent(`<input id="foo" style="visibility:hidden">`)
    await assertSnapshot(async () => expect(await page.$('#foo')).toBeVisible())
  })

  describe("with 'not' usage", () => {
    it.only("positive", async () => {
      await page.setContent(`<body><div id="bar" style="visibility:hidden"><body>`)
      await expect(page).not.toBeVisible("div")
    })

    it("positive: handle-element", async () => {
      await page.setContent(`<input id="foo" style="visibility:hidden">`)
      await expect(await page.$('#foo')).not.toBeVisible()
    })

    it("negative: target element is visible", async () => {
      await page.setContent(`<input id="foobar" style="visibility:visible">`)
      await assertSnapshot(() => expect(page).not.toBeVisible("#foobar"))
    })

    it("negative: haandle-element: target element is visible", async () => {
      await page.setContent(`<input id="foobar" style="visibility:visible">`)
      await assertSnapshot(async () => expect(await page.$('#foobar')).not.toBeVisible())
    })
  })
  describe("timeout", () => {
    it("positive: should be able to use a custom timeout", async () => {
      setTimeout(async () => {
        await page.setContent(`<body><div id="foobar">Bar</div></body>`)
      }, 500)
      await expect(page).toBeVisible("#foobar")
    })
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toBeVisible("#foobar", { timeout: 1 * 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })

})
