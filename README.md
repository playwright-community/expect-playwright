# expect-playwright

![Node.js CI](https://github.com/playwright-community/expect-playwright/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/playwright-community/expect-playwright/branch/master/graph/badge.svg?token=Eay491HC49)](https://codecov.io/gh/playwright-community/expect-playwright)
[![NPM](https://img.shields.io/npm/v/expect-playwright)](https://www.npmjs.com/package/expect-playwright)

This library provides utility matchers for Jest in combination with [Playwright]. All of them are exposed on the `expect` object. You can use them either directly or invert them via the `.not` property like shown in a example below.

```txt
npm install -D expect-playwright
```

## Usage

### With Jest

To activate it in your Jest environment you have to include it in your configuration.

```json
{
  "setupFilesAfterEnv": ["expect-playwright"]
}
```

### With [Playwright test runner](https://playwright.dev/docs/test-intro)

To activate with the Playwright test runner, use `expect.extend()` in the config to add the `expect-playwright` matchers.

```js
// playwright.config.ts
import { expect } from "@playwright/test"
import { matchers } from "expect-playwright"

expect.extend(matchers)

// ...
```

## Why do I need it

The [Playwright] API is great, but it is low level and not designed for integration testing. So this package tries to provide a bunch of utility functions to perform the common checks easier.

Example which should wait and compare the text content of a paragraph on the page.

```javascript
// before
await page.waitForSelector("#foo")
const textContent = await page.$eval("#foo", (el) => el.textContent)
expect(textContent).stringContaining("my text")

// after by using expect-playwright
await expect(page).toMatchText("#foo", "my text")
```

## API documentation

### Table of Contents

- [toHaveSelector](#toHaveSelector)
- [toHaveSelectorCount](#toHaveSelectorCount)
- [toMatchText](#toMatchText)
- [toEqualText](#toEqualText)
- [toEqualValue](#toEqualValue)
- [toEqualUrl](#toEqualUrl)
- [toHaveFocus](#toHaveFocus)

### toHaveSelector

**expect(page: [Page]).toHaveSelector(selector: string, options?: [PageWaitForSelectorOptions](https://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options))**

This function waits as a maximum as the timeout exceeds for a given selector once it appears on the page.

```js
await expect(page).toHaveSelector("#foobar")
```

When used with `not`, `toHaveSelector` will wait for the element to have the state of `hidden`.

```js
await expect(page).not.toHaveSelector("#foobar")
```

### toHaveFocus

**expect(page: [Page]).toHaveFocus(selector: string, options?: [PageWaitForSelectorOptions](https://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options))**

This function checks if the given selector has focus.

```js
await expect(page).toHaveFocus("#foobar")
// or via not, useful to only wait 1 second instead of for the default timeout by Playwright which is 30 seconds.
await expect(page).not.toHaveFocus("#foobar", {
  timeout: 1 * 1000,
})
```

### toEqualUrl

**expect(page: [Page]).toHaveSelector(value: string)**

This function checks if the given URL matches the current page's URL

```javascript
await expect(page).toEqualUrl("https://github.com")
```

### toHaveSelectorCount

**expect(page: [Page]).toHaveSelector(selector: string, value: number, options?: [PageWaitForSelectorOptions](https://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options))**

This function checks if the count of a given selector is the same as the provided value.

```javascript
await expect(page).toHaveSelectorCount(".my-element", 3)
```

### toMatchText

This function checks if the `textContent` of a given element matches the provided pattern.

You can do this via a selector on the whole page:

**expect(page: [Page]).toMatchText(selector: string, pattern: RegExp | string, options?: [PageWaitForSelectorOptions](https://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options))**

```javascript
await expect(page).toMatchText("#my-element", "MyPattern")
await expect(page).toMatchText("#my-element", /MyPattern/)
```

Or without a selector which will use the `body` element:

**expect(page: [Page]).toMatchText(pattern: RegExp | string)**

```javascript
await expect(page).toMatchText(/Playwright/)
await expect(page).toMatchText("Playwright")
```

Or by passing a Playwright [ElementHandle]:

**expect(element: [ElementHandle]).toMatchText(value: string)**

```javascript
const element = await page.$("#my-element")
await expect(element).toMatchText("Playwright")
```

### toEqualText

This function checks if the `textContent` of a given element is the same as the provided value.

You can do this via a selector on the whole page:

**expect(page: [Page]).toEqualText(selector: string, value: string, options?: [PageWaitForSelectorOptions](https://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options))**

```javascript
await expect(page).toEqualText("#my-element", "Playwright")
```

Or without a selector which will use the `body` element:

**expect(page: [Page]).toEqualText(value: string, options?: [PageWaitForSelectorOptions](https://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options))**

```javascript
await expect(page).toEqualText("Playwright")
```

Or by passing a Playwright [ElementHandle]:

**expect(element: [ElementHandle]).toEqualText(value: string, options?: [PageWaitForSelectorOptions](https://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options))**

```javascript
const element = await page.$("#my-element")
await expect(element).toEqualText("Playwright")
```

### toEqualValue

This function checks if the `value` of a given element is the same as the provided value.

You can do this via a selector or the element directly:

**expect(page: [Page]).toEqualValue(selector: string, value: string, options?: [PageWaitForSelectorOptions](https://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options))**

```javascript
await expect(page).toEqualValue("#my-element", "Playwright")
```

Or by passing a Playwright [ElementHandle]:

**expect(element: [ElementHandle]).toEqualValue(value: string, options?: [PageWaitForSelectorOptions](https://playwright.dev/docs/api/class-page/#pagewaitforselectorselector-options))**

```javascript
const element = await page.$("#my-element")
await expect(element).toEqualValue("Playwright")
```

## Examples

```typescript
import playwright from "playwright-chromium"

describe("GitHub Playwright project", () => {
  it("should should have Playwright in the README heading", async () => {
    const browser = await playwright.chromium.launch()
    const page = await browser.newPage()
    await page.goto("https://github.com/microsoft/playwright")
    await expect(page).toMatchText("#readme h1", "Playwright")
    // or also all of them via the not property
    await expect(page).not.toMatchText("this-is-no-anywhere", {
      timeout: 1 * 1000,
    })
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

[elementhandle]: https://github.com/microsoft/playwright/blob/master/docs/api.md#class-elementhandle
[page]: https://github.com/microsoft/playwright/blob/master/docs/api.md#class-page
[playwright]: https://github.com/microsoft/Playwright
