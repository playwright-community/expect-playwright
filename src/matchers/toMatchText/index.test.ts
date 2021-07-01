import { assertSnapshot } from "../tests/utils"

describe("toMatchText", () => {
  beforeEach(async () => {
    await jestPlaywright.resetContext()
  })
  describe("selector", () => {
    it("positive frame", async () => {
      await page.setContent(`<iframe src="http://localhost:8080"></iframe>`)
      const handle = await page.$("iframe")
      const iframe = await handle!.contentFrame()
      await expect(handle).toMatchText("#text", /foo/i)
      await expect(iframe).toMatchText("#text", /foo/i)
    })
    it("positive", async () => {
      await page.setContent(`<div id="foobar">Bar</div>`)
      await expect(page).toMatchText("#foobar", /[B|b]ar/)
    })
    it("positive with string", async () => {
      await page.setContent(`<div id="foobar">Bar</div>`)
      await expect(page).toMatchText("#foobar", "Bar")
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      await assertSnapshot(() => expect(page).toMatchText("#foobar", /[b]ar/))
    })
    it("negative with string", async () => {
      await page.setContent(`<div id="foobar">Bar</div>`)
      await assertSnapshot(() => expect(page).toMatchText("#foobar", "bar"))
    })
    describe("with 'not' usage", () => {
      it("positive in frame", async () => {
        await page.setContent(`<iframe src="http://localhost:8080"></iframe>`)
        const handle = await page.$("iframe")
        const iframe = await handle!.contentFrame()
        await expect(handle).not.toMatchText("#text", /baz/)
        await expect(iframe).not.toMatchText("#text", /baz/)
      })
      it("positive", async () => {
        await page.setContent(`<div id="foobar">Bar</div>`)
        await expect(page).not.toMatchText("#foobar", /exam.*[1|2]/)
      })
      it("positive with string", async () => {
        await page.setContent(`<div id="foobar">Bar</div>`)
        await expect(page).not.toMatchText("#foobar", "foo")
      })
      it("negative", async () => {
        await page.setContent(`<div class="foobar">zzzBarzzz</div>`)
        await assertSnapshot(() =>
          expect(page).not.toMatchText(".foobar", /Bar/)
        )
      })
      it("negative with string", async () => {
        await page.setContent(`<div id="foobar">Foo</div>`)
        await assertSnapshot(() =>
          expect(page).not.toMatchText("#foobar", "Foo")
        )
      })
    })
    describe("timeout", () => {
      it("positive: should be able to use a custom timeout", async () => {
        setTimeout(async () => {
          await page.setContent(`<div id="foobar">Bar</div>`)
        }, 500)
        await expect(page).toMatchText("#foobar", /[B|b]ar/, { timeout: 1000 })
      })
      it("should throw an error after the timeout exceeds", async () => {
        const start = new Date().getTime()
        await assertSnapshot(() =>
          expect(page).toMatchText("#foobar", /[B|b]ar/, { timeout: 1000 })
        )
        const duration = new Date().getTime() - start
        expect(duration).toBeLessThan(1500)
      })
    })
  })
  describe("element", () => {
    it("positive", async () => {
      await page.setContent(`<div id="foobar">Bar</div>`)
      const element = page.$("#foobar")
      await expect(element).toMatchText("Bar")
      await expect(await element).toMatchText(/Bar/)
    })
    it("negative", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      const element = await page.$("#foobar")
      expect(element).not.toBeNull()
      await assertSnapshot(() => expect(element!).toMatchText("not-existing"))
    })
  })
  describe("page", () => {
    it("positive", async () => {
      await page.setContent(`<body><div>Bar</div></body>`)
      await expect(page).toMatchText("Bar")
    })
    it("negative", async () => {
      await page.setContent(`<body><div>zzzBarzzz</div></body>`)
      await assertSnapshot(() => expect(page).toMatchText(/not-existing/))
    })
    it("negative", async () => {
      await page.setContent(`<body><div>zzzBarzzz</div></body>`)
      await assertSnapshot(() => expect(page).toMatchText("not-existing"))
    })
  })
})
