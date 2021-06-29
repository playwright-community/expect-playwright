import { assertSnapshot } from "../tests/utils"

const black = "rgb(0, 0, 0)"
const content = `
  <style>#foo { background-color: black }</style>
  <p id="foo">Hi</p>
`

describe("toHaveComputedStyle", () => {
  beforeEach(() => jestPlaywright.resetContext())

  describe("selector", () => {
    it("positive", async () => {
      await page.setContent(content)
      await expect(page).toHaveComputedStyle("#foo", "backgroundColor", black)
    })

    it("positive in frame", async () => {
      await page.setContent('<iframe src="https://example.com">')
      const args = ["body", "backgroundColor", "rgb(240, 240, 242)"] as const

      const handle = page.$("iframe")
      await expect(handle).toHaveComputedStyle(...args)
      await expect(await handle).toHaveComputedStyle(...args)

      const iframe = (await handle)?.contentFrame()
      await expect(iframe).toHaveComputedStyle(...args)
      await expect(await iframe).toHaveComputedStyle(...args)
    })

    it("negative", async () => {
      await page.setContent(content)
      await assertSnapshot(() =>
        expect(page).toHaveComputedStyle("#foo", "color", "white")
      )
    })

    describe("with 'not' usage", () => {
      it("positive", async () => {
        await page.setContent(content)
        expect(page).not.toHaveComputedStyle("#foo", "color", "white")
      })

      it("positive in frame", async () => {
        await page.setContent('<iframe src="https://example.com">')
        const args = ["body", "backgroundColor", "white"] as const

        const handle = page.$("iframe")
        await expect(handle).not.toHaveComputedStyle(...args)
        await expect(await handle).not.toHaveComputedStyle(...args)

        const iframe = (await handle)?.contentFrame()
        await expect(iframe).not.toHaveComputedStyle(...args)
        await expect(await iframe).not.toHaveComputedStyle(...args)
      })

      it("negative", async () => {
        await page.setContent(content)
        await assertSnapshot(() =>
          expect(page).not.toHaveComputedStyle("#foo", "color", black)
        )
      })
    })
  })

  describe("element", () => {
    it("positive", async () => {
      await page.setContent(content)
      const element = page.$("#foo")
      await expect(element).toHaveComputedStyle("color", black)
      await expect(await element).toHaveComputedStyle("color", black)
    })

    it("negative", async () => {
      await page.setContent(content)
      const element = await page.$("#foo")
      await assertSnapshot(() =>
        expect(element).toHaveComputedStyle("backgroundColor", "white")
      )
    })
  })

  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toHaveComputedStyle("#foo", "color", "white", {
          timeout: 1000,
        })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeGreaterThan(1000)
      expect(duration).toBeLessThan(1500)
    })
  })
})
