import { assertSnapshot } from "../tests/utils"

describe("toMatchUrl", () => {
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
    await expect(handle).toMatchUrl(myUrl)
    await expect(iframe).toMatchUrl(/\d\.html$/)
  })

  it("positive", async () => {
    const myUrl = `${urlPrefix}/1.html`
    await page.goto(myUrl)
    await expect(page).toMatchUrl(myUrl)
  })

  it("negative", async () => {
    await page.goto(`${urlPrefix}/1.html`)
    await assertSnapshot(() => expect(page).toMatchUrl(`${urlPrefix}/2.html`))
    await assertSnapshot(() => expect(page).toMatchUrl(/htm$/))
  })

  describe("with 'not' usage", () => {
    it("positive in frame", async () => {
      const myUrl = `${urlPrefix}/1.html`
      await page.setContent(`<iframe src="${myUrl}"></iframe>`)
      const handle = await page.$("iframe")
      const iframe = await handle?.contentFrame()
      await expect(handle).not.toMatchUrl("foobar")
      await expect(iframe).not.toMatchUrl(/foo/)
    })

    it("positive", async () => {
      await page.goto(`${urlPrefix}/1.html`)
      await expect(page).not.toMatchUrl("foobar")
      await expect(page).not.toMatchUrl(/foo/)
    })

    it("negative", async () => {
      const myUrl = `${urlPrefix}/1.html`
      await page.goto(myUrl)
      await assertSnapshot(() => expect(page).not.toMatchUrl(myUrl))
      await assertSnapshot(() => expect(page).not.toMatchUrl(/html$/))
    })
  })
})
