import toEqualUrl from "."
import { assertSnapshot } from "../tests/utils"

expect.extend({ toEqualUrl })

describe("toEqualUrl", () => {
  const urlPrefix = "http://i-do-not-exist.com"

  beforeAll(async () => {
    await page.route("**/1.html", (route) => {
      route.fulfill({
        body: "123",
        headers: {
          "Content-Type": "text/html",
        },
      })
    })
  })

  afterEach(async () => {
    await page.setContent("")
  })

  it("positive in frame", async () => {
    const myUrl = `${urlPrefix}/1.html`
    await page.setContent(`<iframe src="${myUrl}"></iframe>`)
    const handle = await page.$("iframe")
    const iframe = await handle?.contentFrame()
    await expect(handle).toEqualUrl(myUrl)
    await expect(iframe).toEqualUrl(myUrl)
  })

  it("positive", async () => {
    const myUrl = `${urlPrefix}/1.html`
    await page.goto(myUrl)
    await expect(page).toEqualUrl(myUrl)
  })

  it("negative", async () => {
    await page.goto(`${urlPrefix}/1.html`)
    await assertSnapshot(() => expect(page).toEqualUrl(`${urlPrefix}/2.html`))
  })

  describe("with 'not' usage", () => {
    it("positive in frame", async () => {
      const myUrl = `${urlPrefix}/1.html`
      await page.setContent(`<iframe src="${myUrl}"></iframe>`)
      const handle = await page.$("iframe")
      const iframe = await handle?.contentFrame()
      await expect(handle).not.toEqualUrl("foobar")
      await expect(iframe).not.toEqualUrl("foobar")
    })

    it("positive", async () => {
      await page.goto(`${urlPrefix}/1.html`)
      await expect(page).not.toEqualUrl("foobar")
    })

    it("negative", async () => {
      const myUrl = `${urlPrefix}/1.html`
      await page.goto(myUrl)
      await assertSnapshot(() => expect(page).not.toEqualUrl(myUrl))
    })
  })
})
