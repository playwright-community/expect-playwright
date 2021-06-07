import { assertSnapshot } from "../tests/utils"
import toHaveSelector from "."

expect.extend({ toHaveSelector })

describe("toHaveSelector", () => {
  afterEach(async () => {
    await page.setContent("")
  })
  it("positive", async () => {
    await page.setContent(`<div id="foobar">Bar</div>`)
    await expect(page).toHaveSelector("#foobar")
  })
  it("negative", async () => {
    await assertSnapshot(() =>
      expect(page).toHaveSelector("#foobar", { timeout: 1000 })
    )
  })

  describe("with 'not' usage", () => {
    it("positive", async () => {
      await expect(page).not.toHaveSelector("#foobar", { timeout: 1000 })
    })

    it("negative", async () => {
      await page.setContent(`<div id="foobar">Bar</div>`)
      await assertSnapshot(() => expect(page).not.toHaveSelector("#foobar"))
    })
  })

  describe("timeout", () => {
    it("positive: should be able to use a custom timeout", async () => {
      setTimeout(async () => {
        await page.setContent(`<div id="foobar">Bar</div>`)
      }, 500)
      await expect(page).toHaveSelector("#foobar", { timeout: 1000 })
    })
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toHaveSelector("#foobar", { timeout: 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})
