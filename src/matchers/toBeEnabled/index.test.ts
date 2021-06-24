import { assertSnapshot } from "../tests/utils"

describe("toBeEnabled", () => {
  afterEach(async () => {
    await page.setContent("")
  })

  it("positive", async () => {
    await page.setContent('<button id="foo">')
    await expect(page).toBeEnabled("#foo")
  })

  it("negative: target element isn't enabled", async () => {
    await page.setContent('<button id="foo" disabled>')
    await assertSnapshot(() => expect(page).toBeEnabled("#foo"))
  })

  it("negative: target element not found", async () => {
    await page.setContent('<button id="foo">')
    await assertSnapshot(() =>
      expect(page).toBeEnabled("#bar", { timeout: 1000 })
    )
  })

  describe("with 'not' usage", () => {
    it("positive", async () => {
      await page.setContent('<button id="foo" disabled>')
      await expect(page).not.toBeEnabled("#foo")
    })

    it("negative", async () => {
      await page.setContent('<button id="foo">')
      await assertSnapshot(() => expect(page).not.toBeEnabled("#foo"))
    })
  })

  describe("timeout", () => {
    it("positive: should be able to use a custom timeout", async () => {
      setTimeout(() => page.setContent('<button id="foo">'), 500)
      await expect(page).toBeEnabled("#foo", { timeout: 1000 })
    })

    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toBeEnabled("#foo", { timeout: 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeGreaterThan(1000)
      expect(duration).toBeLessThan(1500)
    })
  })
})
