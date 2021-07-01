import { assertSnapshot } from "../tests/utils"

const black = "rgb(0, 0, 0)"
const content = `
  <style>#foo { background-color: black }</style>
  <p id="foo">Hi</p>
`

describe("toMatchComputedStyle", () => {
  beforeEach(() => jestPlaywright.resetContext())

  describe("selector", () => {
    it("positive", async () => {
      await page.setContent(content)
      await expect(page).toMatchComputedStyle("#foo", "background-color", black)
      await expect(page).toMatchComputedStyle("#foo", "background-color", /rgb/)
    })

    it("positive in frame", async () => {
      await page.setContent('<iframe src="http://localhost:8080">')
      const args = ["#styles", "color", "rgb(255, 0, 0)"] as const

      const handle = page.$("iframe")
      await expect(handle).toMatchComputedStyle(...args)
      await expect(await handle).toMatchComputedStyle(...args)

      const iframe = (await handle)?.contentFrame()
      await expect(iframe).toMatchComputedStyle(...args)
      await expect(await iframe).toMatchComputedStyle(...args)
    })

    it("negative", async () => {
      await page.setContent(content)
      await assertSnapshot(() =>
        expect(page).toMatchComputedStyle("#foo", "color", "white")
      )
    })

    describe("with 'not' usage", () => {
      it("positive", async () => {
        await page.setContent(content)
        expect(page).not.toMatchComputedStyle("#foo", "color", "white")
        expect(page).not.toMatchComputedStyle("#foo", "color", /rgba/)
      })

      it("positive in frame", async () => {
        await page.setContent('<iframe src="http://localhost:8080">')
        const args = ["#styles", "color", "rgb(0, 0, 0)"] as const

        const handle = page.$("iframe")
        await expect(handle).not.toMatchComputedStyle(...args)
        await expect(await handle).not.toMatchComputedStyle(...args)

        const iframe = (await handle)?.contentFrame()
        await expect(iframe).not.toMatchComputedStyle(...args)
        await expect(await iframe).not.toMatchComputedStyle(...args)
      })

      it("negative", async () => {
        await page.setContent(content)
        await assertSnapshot(() =>
          expect(page).not.toMatchComputedStyle("#foo", "color", black)
        )
      })
    })
  })

  describe("element", () => {
    it("positive", async () => {
      await page.setContent(content)
      const element = page.$("#foo")
      await expect(element).toMatchComputedStyle("color", black)
      await expect(await element).toMatchComputedStyle("color", /rgb/)
    })

    it("negative", async () => {
      await page.setContent(content)
      const element = await page.$("#foo")
      await assertSnapshot(() =>
        expect(element).toMatchComputedStyle("background-color", "white")
      )
    })
  })

  describe("timeout", () => {
    it("should throw an error after the timeout exceeds", async () => {
      const start = new Date().getTime()
      await assertSnapshot(() =>
        expect(page).toMatchComputedStyle("#foo", "color", "white", {
          timeout: 1000,
        })
      )
      const duration = new Date().getTime() - start
      expect(duration).toBeGreaterThan(1000)
      expect(duration).toBeLessThan(1500)
    })
  })
})
