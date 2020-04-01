# Expect Playwright

![Node.js CI](https://github.com/mxschmitt/expect-playwright/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/mxschmitt/expect-playwright/branch/master/graph/badge.svg?token=Eay491HC49)](https://codecov.io/gh/mxschmitt/expect-playwright)

This library provides utility matchers for the Jest testing framework in combination with [Playwright]. All of them are exposed on the `expect` object. You can use them either directly or invert them via the `.not` property like shown below in the examples.

## Usage

### toHaveSelector

**expect(page: [Page]).toHaveSelector(selector: string, options: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

This helper function waits as a maximum as the timeout exceeds for a given selector once it appears on the screen. It has a default timeout of 1 second, which you can overwrite via the options.

```js
await expect(page).toHaveSelector("Playwright")
// or via not
await expect(page).not.toHaveSelector("Playwright")
```

### toHaveText

**expect(page: [Page]).toHaveText(selector: string, value: string, options: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

**expect(page: [Page]).toHaveText(value: string, options: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

**expect(page: [ElementHandle]).toHaveText(value: string, options: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

This helper function checks if the the `textContent` of a given element (either by a [ElementHandle] or selector) or the whole Page contains the provided value.

By default it waits 1 second for the element which you can overwrite via the options.

```js
// specific selector
await expect(page).toHaveText("#my-element", "MyValue")

// whole page
await expect(page).toHaveText("Playwright")

// specific element
const element = await page.$('#my-element');
await expect(element).toHaveText("Playwright")

// or also all of them via the not property
await expect(page).not.toHaveText("Playwright")
```

### toEqualText

**expect(page: [Page]).toEqualText(selector: string, value: string, options: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

**expect(page: [Page]).toEqualText(value: string, options: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

**expect(page: [ElementHandle]).toEqualText(value: string, options: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

This helper function checks if the `textContent` of a given element (either by a [ElementHandle] or selector) or the whole Page is the same as the provided value.

By default it waits 1 second for the element which you can overwrite via the options.

## Examples

```typescript
import playwright from 'playwright-chromium'

describe("GitHub Playwright project", () => {
  it("should should have Playwright as a heading", async () => {
    const browser = await playwright.chromium.launch()
    const page = await browser.newPage()
    await page.goto("https://github.com/microsoft/playwright")
    await expect(page).toHaveText("#readme h1", "Playwright")
    await browser.close()
  })
})
```

## Usage with TypeScript

There are typings available. For that just import

```typescript
import "expect-playwright"
```

at the top of your test or include it in your `tsconfig.js`.

## Inspired by

- [expect-puppeteer](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer)

[ElementHandle]: https://github.com/microsoft/playwright/blob/master/docs/api.md#class-elementhandle
[Page]: https://github.com/microsoft/playwright/blob/master/docs/api.md#class-page
[Playwright]: https://github.com/microsoft/Playwright
