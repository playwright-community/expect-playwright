# expect-playwright

![Node.js CI](https://github.com/playwright-community/expect-playwright/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/playwright-community/expect-playwright/branch/master/graph/badge.svg?token=Eay491HC49)](https://codecov.io/gh/playwright-community/expect-playwright)
[![NPM](https://img.shields.io/npm/v/expect-playwright)](https://www.npmjs.com/package/expect-playwright)

This library provides utility matchers for Jest in combination with [Playwright]. All of them are exposed on the `expect` object. You can use them either directly or invert them via the `.not` property like shown in a example below.

```txt
npm install -D expect-playwright
```

## Usage

### With [Playwright test runner](https://playwright.dev/docs/test-intro)

To activate with the Playwright test runner, use `expect.extend()` in the config to add the `expect-playwright` matchers.

```js
// playwright.config.ts
import { expect } from "@playwright/test"
import { matchers } from "expect-playwright"

expect.extend(matchers)

// ...
```

### With Jest

To activate it in your Jest environment you have to include it in your configuration.

```json
{
  "setupFilesAfterEnv": ["expect-playwright"]
}
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

- [toBeChecked](#toBeChecked)
- [toBeDisabled](#toBeDisabled)
- [toBeEnabled](#toBeEnabled)
- [toHaveFocus](#toHaveFocus)
- [toHaveSelector](#toHaveSelector)
- [toHaveSelectorCount](#toHaveSelectorCount)
- [toMatchText](#toMatchText)
- [toMatchTitle](#toMatchTitle)
- [toMatchURL](#toMatchURL)
- [toMatchValue](#toMatchValue)

### toBeChecked

This function checks if a given element is checked.

You can do this via a selector on the whole page:

```javascript
await expect(page).toBeChecked("#my-element")
```

Or by passing a Playwright [ElementHandle]:

```javascript
const element = await page.$("#my-element")
await expect(element).toBeChecked()
```

### toBeDisabled

This function checks if a given element is disabled.

You can do this via a selector on the whole page:

```javascript
await expect(page).toBeDisabled("#my-element")
```

Or by passing a Playwright [ElementHandle]:

```javascript
const element = await page.$("#my-element")
await expect(element).toBeDisabled()
```

### toBeEnabled

This function checks if a given element is enabled.

You can do this via a selector on the whole page:

```javascript
await expect(page).toBeEnabled("#my-element")
```

Or by passing a Playwright [ElementHandle]:

```javascript
const element = await page.$("#my-element")
await expect(element).toBeEnabled()
```

### toHaveFocus

This function checks if the given selector has focus.

```js
await expect(page).toHaveFocus("#foobar")
// or via not, useful to only wait 1 second instead of for the default timeout by Playwright which is 30 seconds.
await expect(page).not.toHaveFocus("#foobar", {
  timeout: 1 * 1000,
})
```

### toHaveSelector

This function waits as a maximum as the timeout exceeds for a given selector once it appears on the page.

```js
await expect(page).toHaveSelector("#foobar")
```

When used with `not`, `toHaveSelector` will wait until the element is not visible or not attached. See the Playwright [waitForSelector](https://playwright.dev/docs/api/class-page#page-wait-for-selector) docs for more details.

```js
await expect(page).not.toHaveSelector("#foobar")
```

### toHaveSelectorCount

This function checks if the count of a given selector is the same as the provided value.

```javascript
await expect(page).toHaveSelectorCount(".my-element", 3)
```

### toMatchText

This function checks if the `textContent` of a given element matches the provided string or regex pattern.

You can do this via a selector on the whole page:

```javascript
await expect(page).toMatchText("#my-element", "Playwright")
await expect(page).toMatchText("#my-element", /Play.+/)
```

Or without a selector which will use the `body` element:

```javascript
await expect(page).toMatchText("Playwright")
await expect(page).toMatchText(/Play.+/)
```

Or by passing a Playwright [ElementHandle]:

```javascript
const element = await page.$("#my-element")
await expect(element).toMatchText("Playwright")
await expect(element).toMatchText(/Play.+/)
```

### toMatchTitle

This function checks if the page or frame title matches the provided string or regex pattern.

```javascript
await expect(page).toMatchTitle("My app - page 1")
await expect(page).toMatchTitle(/My app - page \d/)
```

### toMatchURL

This function checks if the current page's URL matches the provided string or regex pattern.

```javascript
await expect(page).toMatchURL("https://github.com")
await expect(page).toMatchURL(/github\.com/)
```

### toMatchValue

This function checks if the `value` of a given element is the same as the provided string or regex pattern.

You can do this via a selector or the element directly:

```javascript
await expect(page).toMatchValue("#my-element", "Playwright")
await expect(page).toMatchValue("#my-element", /Play.+/)
```

Or by passing a Playwright [ElementHandle]:

```javascript
const element = await page.$("#my-element")
await expect(element).toMatchValue("Playwright")
await expect(element).toMatchValue(/Play.+/)
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
[playwright]: https://github.com/microsoft/Playwright
