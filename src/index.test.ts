import matchers from './matchers';

import expectPlaywright from "."

describe("expect-playwright", () => {
  afterEach(async () => {
    await page.setContent('')
  })
  it("should apply the functions", () => {
    for (let matcher in matchers) {
      // @ts-ignore
      expect(expect(null)[matcher]).not.toBeUndefined()
    }
  })
  it("should be possible to use a not selector", async () => {
    await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
    await expect(page).not.toHaveText("This is definitely not there")
  })
  it("should be possible to use a normal selector", async () => {
    await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
    await expect(page).toHaveText("zzzBarzzz")
  })
})

describe("expectPlaywright", () => {
  afterEach(async () => {
    await page.setContent('')
  })
  describe("should be able to handle positive cases", () => {
    it("return right result for page and 2 arguments", async () => {
      await page.setContent(`<div id="foobar">zzzBarzzz</div>`)
      expect(await expectPlaywright(page).toHaveText("zzzBarzzz")).toBe(true)
    })
    it("return right result for page and 3 arguments", async () => {
      await page.setContent(`<div id="bar">zzzBarzzz</div>`)
      expect(await expectPlaywright(page).toHaveText("#bar", "zzzBarzzz")).toBe(true)
    })
    it("return right result for element and 2 arguments", async () => {
      await page.setContent(`<div id="foo">zzzFoozzz</div>`)
      const elem = await page.$('#foo')
      expect(await expectPlaywright(elem!).toHaveText("zzzFoozzz")).toBe(true)
    })
  })
  describe("should be able to handle negative cases", () => {
    it("return right result for page and 2 arguments", async () => {
      await page.setContent(`<div id="foobar">zzzzz</div>`)
      await expect(expectPlaywright(page).toHaveText("zzzBarzzz")).rejects.toThrowErrorMatchingSnapshot()
    })
    it("return right result for page and 4 arguments", async () => {
      await page.setContent(`<div id="foo">zzzBarzzz</div>`)
      await expect(expectPlaywright(page).toHaveText("#bar", "zzzBarzzz", {
        timeout: 1* 1000
      })).rejects.toThrowErrorMatchingSnapshot()
    })
  })
})
