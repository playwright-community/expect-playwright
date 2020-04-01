import matchers from './matchers';

import "."

describe("expect-playwright", () => {
  afterEach(async () => {
    await page.evaluate(() => document.body.innerHTML = "")
  })
  it("should apply the functions", () => {
    for (let matcher in matchers) {
      // @ts-ignore
      expect(expect(null)[matcher]).not.toBeUndefined()
    }
  })
  it("should be possible to use a not selector", async () => {
    await page.evaluate(() => {
      document.write(`<div id="foobar">zzzBarzzz</div>`)
    })
    await expect(page).not.toHaveText("This is definitely not there")
  })
  it("should be possible to use a normal selector", async () => {
    await page.evaluate(() => {
      document.write(`<div id="foobar">zzzBarzzz</div>`)
    })
    await expect(page).toHaveText("zzzBarzzz")
  })
})