import { assertSnapshot } from "../tests/utils"

describe("toHaveText", () => {
  beforeEach(async () => {
    await jestPlaywright.resetContext()
  })
  describe("selector", () => {
    it("positive frame", async () => {
      await page.setContent(`<iframe src="http://localhost:8080"></iframe>`)
      const handle = await page.$("iframe")
      const iframe = await handle?.contentFrame()
      await expect(handle).toHaveText("expect-playwright")
      await expect(iframe).toHaveText("expect-playwright")
    })
    it("empty positive with page element", async () => {
      await page.setContent(`<div id="foobar"></div>`)
      await expect(page).toHaveText("#foobar", "", {
        state: "attached",
      })
    })
    it("empty positive with custom element", async () => {
      await page.setContent(`<div id="foobar"></div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      await expect(element).toHaveText("")
    })
    it("positive", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      await expect(page).toHaveText("#foobar", "Bar")
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      await assertSnapshot(() =>
        expect(page).toHaveText("#foobar", "not-existing")
      )
    })
  })
  describe("element", () => {
    it("positive", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      await expect(element).toHaveText("Bar")
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      await assertSnapshot(() => expect(element).toHaveText("not-existing"))
    })
  })
  describe("page", () => {
    it("positive", async () => {
      await page.setContent(`<body><div>zzzBarzzz</div></body>`)
      await expect(page).toHaveText("Bar")
    })
    it("negative", async () => {
      await page.setContent(`<body><div>zzzBarzzz</div></body>`)
      await assertSnapshot(() => expect(page).toHaveText("not-existing"))
    })
  })
  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toHaveText("#foobar", "bar", { timeout: 1000 })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeLessThan(1500)
    })
  })
})
