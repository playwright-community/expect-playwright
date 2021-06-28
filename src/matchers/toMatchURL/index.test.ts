import { assertSnapshot } from "../tests/utils"

describe("toMatchURL", () => {
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

    const handle = page.$("iframe")
    await expect(handle).toMatchURL(myUrl)
    await expect(await handle).toMatchURL(myUrl)

    const iframe = (await handle)?.contentFrame()
    await expect(iframe).toMatchURL(/\d\.html$/)
    await expect(await iframe).toMatchURL(/\d\.html$/)
  })

  it("positive", async () => {
    const myUrl = `${urlPrefix}/1.html`
    await page.goto(myUrl)
    await expect(page).toMatchURL(myUrl)
  })

  it("negative", async () => {
    await page.goto(`${urlPrefix}/1.html`)
    await assertSnapshot(() => expect(page).toMatchURL(`${urlPrefix}/2.html`))
    await assertSnapshot(() => expect(page).toMatchURL(/htm$/))
  })

  describe("with 'not' usage", () => {
    it("positive in frame", async () => {
      const myUrl = `${urlPrefix}/1.html`
      await page.setContent(`<iframe src="${myUrl}"></iframe>`)

      const handle = page.$("iframe")
      await expect(handle).not.toMatchURL("foobar")
      await expect(await handle).not.toMatchURL("foobar")

      const iframe = (await handle)?.contentFrame()
      await expect(iframe).not.toMatchURL(/foo/)
      await expect(await iframe).not.toMatchURL(/foo/)
    })

    it("positive", async () => {
      await page.goto(`${urlPrefix}/1.html`)
      await expect(page).not.toMatchURL("foobar")
      await expect(page).not.toMatchURL(/foo/)
    })

    it("negative", async () => {
      const myUrl = `${urlPrefix}/1.html`
      await page.goto(myUrl)
      await assertSnapshot(() => expect(page).not.toMatchURL(myUrl))
      await assertSnapshot(() => expect(page).not.toMatchURL(/html$/))
    })
  })
})
