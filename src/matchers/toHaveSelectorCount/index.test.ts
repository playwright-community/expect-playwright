import { assertSnapshot } from "../tests/utils"

describe("toHaveSelectorCount", () => {
  beforeEach(async () => {
    await jestPlaywright.resetContext()
  })
  describe("selector", () => {
    it("positive", async () => {
      await page.setContent(
        `<div class="foobar"></div><div class="foobar">Bar</div>`
      )
      await expect(page).toHaveSelectorCount(".foobar", 2)
    })
    it("positive in frame", async () => {
      await page.setContent(`<iframe src="http://localhost:8080"></iframe>`)
      const handle = page.$("iframe")
      await expect(handle).toHaveSelectorCount("p", 2)
      await expect(await handle).toHaveSelectorCount("p", 2)

      const frame = (await handle)?.contentFrame()
      await expect(frame).toHaveSelectorCount("p", 2)
      await expect(await frame).toHaveSelectorCount("p", 2)
    })
    it("negative", async () => {
      await page.setContent(`<div class="foobar">Bar</div>`)
      await assertSnapshot(() => expect(page).toHaveSelectorCount(".foobar", 2))
    })

    describe("with 'not' usage", () => {
      it("positive", async () => {
        await page.setContent(
          `<div class="foobar"></div><div class="foobar">Bar</div>`
        )
        await expect(page).not.toHaveSelectorCount(".foobar", 1)
      })

      it("negative", async () => {
        await page.setContent(`<div class="foobar">Bar</div>`)
        await assertSnapshot(() =>
          expect(page).not.toHaveSelectorCount(".foobar", 1)
        )
      })
    })
  })
  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toHaveSelectorCount(".foobar", 1, { timeout: 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})
