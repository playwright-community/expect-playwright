# expect-playwright

![Node.js CI](https://github.com/mxschmitt/expect-playwright/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/mxschmitt/expect-playwright/branch/master/graph/badge.svg?token=Eay491HC49)](https://codecov.io/gh/mxschmitt/expect-playwright)
[![NPM](https://img.shields.io/npm/v/expect-playwright)](https://www.npmjs.com/package/expect-playwright)

This library provides utility matchers for Jest in combination with [Playwright]. All of them are exposed on the `expect` object. You can use them either directly or invert them via the `.not` property like shown in a example below.

```txt
npm install -D expect-playwright playwright-core
```

## Usage

### With Jest

To activate it in your Jest environment you have to include it in your configuration.

```json
{
    "setupFilesAfterEnv": ["expect-playwright"]
}
```

### Without Jest

```javascript
import expect from "expect-playwright"

await expect(page).toHaveText("#foo", "my text")
```

## Why do I need it

The [Playwright] API is great, but it is low level and not designed for integration testing. So this package tries to provide a bunch of utility functions to perform the common checks easier.

Example which should wait and compare the text content of a paragraph on the page.

```javascript
// before
await page.waitForSelector("#foo")
const textContent = await page.$eval("#foo", el => el.textContent)
expect(textContent).stringContaining("my text")

// after by using expect-playwright
await expect(page).toHaveText("#foo", "my text")
```

## API documentation

### Table of Contents

- [toHaveSelector](#toHaveSelector)
- [toHaveText](#toHaveText)
- [toEqualText](#toEqualText)
- [toEqualValue](#toEqualValue)

### toHaveSelector

**expect(page: [Page]).toHaveSelector(selector: string, options?: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

This function waits as a maximum as the timeout exceeds for a given selector once it appears on the page.

```js
await expect(page).toHaveSelector("#foobar")
// or via not, useful to only wait 1 second instead of for the default timeout by Playwright which is 30 seconds.
await expect(page).not.toHaveSelector("#foobar", {
  timeout: 1 * 1000
})
```

### toHaveText

This function checks if the the `textContent` of a given element contains the provided value.

You can do this via a selector on the whole page:

**expect(page: [Page]).toHaveText(selector: string, value: string, options?: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

```javascript
await expect(page).toHaveText("#my-element", "MyValue")
```

Or without a selector which will use the `body` element:

**expect(page: [Page]).toHaveText(value: string, options?: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

```javascript
await expect(page).toHaveText("Playwright")
```

Or by passing a Playwright [ElementHandle]:

**expect(page: [ElementHandle]).toHaveText(value: string, options?: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

```javascript
const element = await page.$('#my-element');
await expect(element).toHaveText("Playwright")
```

By default it waits 1 second for the element which you can overwrite via the options.

### toEqualText

This function checks if the `textContent` of a given element is the same as the provided value.

You can do this via a selector on the whole page:

**expect(page: [Page]).toEqualText(selector: string, value: string, options?: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

```javascript
await expect(page).toEqualText("#my-element", "Playwright")
```

Or without a selector which will use the `body` element:

**expect(page: [Page]).toEqualText(value: string, options?: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

```javascript
await expect(page).toEqualText("Playwright")
```

Or by passing a Playwright [ElementHandle]:

**expect(page: [ElementHandle]).toEqualText(value: string, options?: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

```javascript
const element = await page.$('#my-element');
await expect(element).toEqualText("Playwright")
```

By default it waits 1 second for the element which you can overwrite via the options.

### toEqualValue

This function checks if the `value` of a given element is the same as the provided value.

You can do this via a selector or the element directly:

**expect(page: [Page]).toEqualValue(selector: string, value: string, options?: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

```javascript
await expect(page).toEqualValue("#my-element", "Playwright")
```

Or by passing a Playwright [ElementHandle]:

**expect(page: [ElementHandle]).toEqualValue(value: string, options?: [PageWaitForSelectorOptions](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagewaitforselectorselector-options))**

```javascript
const element = await page.$('#my-element');
await expect(element).toEqualValue("Playwright")
```

By default it waits 1 second for the element which you can overwrite via the options.

## Examples

```typescript
import playwright from 'playwright-chromium'

describe("GitHub Playwright project", () => {
  it("should should have Playwright in the README heading", async () => {
    const browser = await playwright.chromium.launch()
    const page = await browser.newPage()
    await page.goto("https://github.com/microsoft/playwright")
    await expect(page).toHaveText("#readme h1", "Playwright")
    // or also all of them via the not property
    await expect(page).not.toHaveText("this-is-no-anywhere", { timeout: 1 * 1000 })
    await browser.close()
  })
})
```

## TypeScript

There are typings available. For that just import

```typescript
import "expect-playwright"
```

at the top of your test file or include it globally in your `tsconfig.json`.

## Inspired by

- [expect-puppeteer](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer)

[ElementHandle]: https://github.com/microsoft/playwright/blob/master/docs/api.md#class-elementhandle
[Page]: https://github.com/microsoft/playwright/blob/master/docs/api.md#class-page
[Playwright]: https://github.com/microsoft/Playwright
