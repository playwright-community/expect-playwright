import { assertSnapshot } from "../tests/utils"

const url = "https://google.com"
const longUrl = "https://www.google.com"

describe("toMatchAttribute", () => {
  beforeEach(async () => {
    await jestPlaywright.resetContext()
  })

  describe("selector", () => {
    it("positive", async () => {
      await page.setContent('<a href="https://google.com">Hi</a>')
      await expect(page).toMatchAttribute("a", "href", url)
      await expect(page).toMatchAttribute("a", "href", /\.com$/)
    })

    it("positive in frame", async () => {
      await page.setContent('<iframe src="http://localhost:8080">')
      const handle = await page.$("iframe")
      const frame = handle?.contentFrame()
      await expect(handle).toMatchAttribute("#attr", "aria-label", "foobar")
      await expect(frame).toMatchAttribute("#attr", "aria-label", /bar$/)
    })

    it("negative", async () => {
      await page.setContent('<a href="https://google.com">Hi</a>')
      await assertSnapshot(() =>
        expect(page).toMatchAttribute("a", "href", longUrl)
      )
      await assertSnapshot(() =>
        expect(page).toMatchAttribute("a", "href", /\.org$/)
      )
    })

    it("negative: target element not found", async () => {
      await assertSnapshot(() =>
        expect(page).toMatchAttribute("a", "foo", "bar", { timeout: 1000 })
      )
    })
  })

  describe("element", () => {
    it("positive", async () => {
      await page.setContent('<a href="https://google.com">Hi</a>')
      const anchor = page.$("a")
      await expect(anchor).toMatchAttribute("href", url)
      await expect(await anchor).toMatchAttribute("href", /\.com$/)
    })

    it("negative", async () => {
      await page.setContent('<a href="https://google.com">Hi</a>')
      const anchor = await page.$("a")
      await assertSnapshot(() =>
        expect(anchor).toMatchAttribute("href", longUrl)
      )
      await assertSnapshot(() =>
        expect(anchor).toMatchAttribute("href", /\.org$/)
      )
    })
  })

  describe("with 'not' usage", () => {
    it("positive", async () => {
      await page.setContent('<a href="https://google.com">Hi</a>')
      await expect(page).not.toMatchAttribute("a", "href", longUrl)
      await expect(page).not.toMatchAttribute("a", "href", longUrl)
    })

    it("positive in frame", async () => {
      await page.setContent('<iframe src="http://localhost:8080">')
      const handle = await page.$("iframe")
      const frame = handle?.contentFrame()
      await expect(handle).not.toMatchAttribute("#attr", "aria-label", "bar")
      await expect(frame).not.toMatchAttribute("#attr", "aria-label", /baz$/)
    })

    it("negative", async () => {
      await page.setContent('<a href="https://google.com">Hi</a>')
      await assertSnapshot(() =>
        expect(page).not.toMatchAttribute("a", "href", url)
      )
    })
  })

  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toMatchAttribute("a", "foo", "bar", { timeout: 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeGreaterThan(1000)
      expect(duration).toBeLessThan(1500)
    })
  })
})
