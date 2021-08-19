import { assertSnapshot } from "../tests/utils"

describe("toBeChecked", () => {
  beforeEach(async () => {
    await jestPlaywright.resetContext()
  })

  describe("selector", () => {
    it("positive", async () => {
      await page.setContent('<input type="checkbox" checked>')
      await expect(page).toBeChecked("input")
    })

    it("positive in frame", async () => {
      await page.setContent(`<iframe src="http://localhost:8080">`)
      const handle = await page.$("iframe")
      const iframe = await handle?.contentFrame()
      await expect(handle).toBeChecked("#checkbox-checked")
      await expect(iframe).toBeChecked("#checkbox-checked")
    })

    it("negative: target element isn't checked", async () => {
      await page.setContent('<input type="checkbox">')
      await assertSnapshot(() => expect(page).toBeChecked("input"))
    })

    it("negative: target element not found", async () => {
      await assertSnapshot(() =>
        expect(page).toBeChecked("input", { timeout: 1000 })
      )
    })
  })

  describe("element", () => {
    it("positive", async () => {
      await page.setContent('<input type="radio" checked>')
      const input = page.$("input")
      await expect(input).toBeChecked()
      await expect(await input).toBeChecked()
    })

    it("negative: target element isn't checked", async () => {
      await page.setContent('<input type="radio">')
      const input = await page.$("input")
      await assertSnapshot(() => expect(input).toBeChecked())
    })
  })

  describe("locator", () => {
    it("positive", async () => {
      await page.setContent('<input type="radio" checked>')
      await expect(page.locator("input")).toBeChecked()
    })

    it("positive", async () => {
      await page.setContent('<input type="radio">')
      await expect(page.locator("input")).not.toBeChecked()
    })
  })

  describe("with 'not' usage", () => {
    it("positive", async () => {
      await page.setContent('<input type="checkbox">')
      await expect(page).not.toBeChecked("input")
    })

    it("positive in frame", async () => {
      await page.setContent(`<iframe src="http://localhost:8080">`)
      const handle = await page.$("iframe")
      const iframe = await handle?.contentFrame()
      await expect(handle).not.toBeChecked("#checkbox-unchecked")
      await expect(iframe).not.toBeChecked("#checkbox-unchecked")
    })

    it("negative", async () => {
      await page.setContent('<input type="checkbox" checked>')
      await assertSnapshot(() => expect(page).not.toBeChecked("input"))
    })
  })

  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toBeChecked("input", { timeout: 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeGreaterThan(1000)
      expect(duration).toBeLessThan(1500)
    })
  })
})
