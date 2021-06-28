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
