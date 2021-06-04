import toEqualUrl from "."
import { assertSnapshot } from "../tests/utils"

expect.extend({ toEqualUrl })

describe("toEqualUrl", () => {
  const urlPrefix = "http://i-do-not-exist.com"

  it("positive", async () => {
    await page.route("**/1.html", (route) => {
      route.fulfill({
        body: "123",
        headers: {
          "Content-Type": "text/html",
        },
      })
    })
    const myUrl = `${urlPrefix}/1.html`
    await page.goto(myUrl)
    expect(page).toEqualUrl(myUrl)
  })
  it("negative", async () => {
    await page.route("**/1.html", (route) => {
      route.fulfill({
        body: "123",
        headers: {
          "Content-Type": "text/html",
        },
      })
    })
    await page.goto(`${urlPrefix}/1.html`)
    await assertSnapshot(() => expect(page).toEqualUrl(`${urlPrefix}/2.html`))
  })
})
