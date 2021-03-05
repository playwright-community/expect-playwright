import toEqualUrl from '.'

describe("toEqualUrl", () => {
  it("should return true if it matches the Url", async () => {
    await page.route("**/1.html", route => {
      route.fulfill({
        body: "123",
        headers: {
          "Content-Type": "text/html"
        }
      })
    })
    const myUrl = "http://i-do-not-exist.com/1.html"
    await page.goto(myUrl)
    const result = await toEqualUrl(page, myUrl)
    expect(result.pass).toBe(true)
    expect(result.message()).toMatchSnapshot()
  })
  it("should return false if it does not match the Url", async () => {
    await page.route("**/1.html", route => {
      route.fulfill({
        body: "123",
        headers: {
          "Content-Type": "text/html"
        }
      })
    })
    await page.goto("http://i-do-not-exist.com/1.html")
    const result = await toEqualUrl(page, "http://i-do-not-exist.com/2.html")
    expect(result.pass).toBe(false)
    expect(result.message()).toMatchSnapshot()
  })
})
