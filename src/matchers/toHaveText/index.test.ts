/// <reference types="jest-playwright-preset" />

import { testWrapper } from "../tests/utils"

import toHaveText from '.'

describe("toHaveText", () => {
  afterEach(async () => {
    await page.evaluate(() => document.body.innerHTML = "")
  })
  describe("selector", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      expect(testWrapper(await toHaveText(page, "#foobar", "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      expect(testWrapper(await toHaveText(page, "#foobar", "not-existing"))).toThrowError()
    })
  })
  describe("element", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      if (!element) {
        return
      }
      expect(testWrapper(await toHaveText(element, "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<div id="foobar">zzzBarzzz</div>`)
      })
      const element = await page.$("#foobar")
      expect(element).not.toBe(null)
      if (!element) {
        return
      }
      expect(testWrapper(await toHaveText(element, "not-existing"))).toThrowError()
    })
  })
  describe("page", () => {
    it("positive", async () => {
      await page.evaluate(() => {
        document.write(`<body><div>zzzBarzzz</div></body>`)
      })
      expect(testWrapper(await toHaveText(page, "Bar"))).toBe(true)
    })
    it("negative", async () => {
      await page.evaluate(() => {
        document.write(`<body><div>zzzBarzzz</div></body>`)
      })
      expect(testWrapper(await toHaveText(page, "not-existing"))).toThrowError()
    })
  })
})