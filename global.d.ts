// copied into our codebase for autocompletion purposes from 'playwright/types/types.d.ts' so we don't depend on it.
interface PageWaitForSelectorOptions {
  /**
   * Defaults to `'visible'`. Can be either:
   * - `'attached'` - wait for element to be present in DOM.
   * - `'detached'` - wait for element to not be present in DOM.
   * - `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without
   *   any content or with `display:none` has an empty bounding box and is not considered visible.
   * - `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`.
   *   This is opposite to the `'visible'` option.
   */
  state?: "attached" | "detached" | "visible" | "hidden"

  /**
   * Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by
   * using the
   * [browserContext.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout)
   * or [page.setDefaultTimeout(timeout)](https://playwright.dev/docs/api/class-page#page-set-default-timeout) methods.
   */
  timeout?: number
}

export interface PlaywrightMatchers<R> {
  /**
   * Will check if the element on the page determined by the selector is checked.
   */
  toBeChecked(
    selector: string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if the element is checked.
   */
  toBeChecked(options?: PageWaitForSelectorOptions): Promise<R>
  /**
   * Will check if the element on the page determined by the selector is disabled.
   */
  toBeDisabled(
    selector: string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if the element is disabled.
   */
  toBeDisabled(options?: PageWaitForSelectorOptions): Promise<R>
  /**
   * Will check if the element on the page determined by the selector is enabled.
   */
  toBeEnabled(
    selector: string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if the element is enabled.
   */
  toBeEnabled(options?: PageWaitForSelectorOptions): Promise<R>
  /**
   * Will check if the element's textContent on the page determined by the selector includes the given text.
   * @deprecated Use toMatchText instead
   */
  toHaveText(
    selector: string,
    value: string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if the element's value includes the given text.
   * @deprecated Use toMatchText instead
   */
  toHaveText(value: string, options?: PageWaitForSelectorOptions): Promise<R>
  /**
   * Will check if an element's attribute on the page determined by the selector matches the given pattern.
   */
  toMatchAttribute(
    selector: string,
    attribute: string,
    value: RegExp | string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if an element's attribute matches the given pattern.
   */
  toMatchAttribute(
    attribute: string,
    value: RegExp | string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if an element's computed style property on the page determined by the selector matches the given string.
   */
  toMatchComputedStyle(
    selector: string,
    property: string,
    value: RegExp | string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if an element's computed style property matches the given string.
   */
  toMatchComputedStyle(
    property: string,
    value: RegExp | string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if the element's textContent on the page determined by the selector matches the given pattern.
   */
  toMatchText(
    selector: string,
    pattern: RegExp | string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if the element's value matches the given pattern.
   */
  toMatchText(
    pattern: RegExp | string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check if the page title matches a given string or regex.
   */
  toMatchTitle(pattern: RegExp | string): Promise<R>
  /**
   * Will check if the page URL matches the given pattern.
   */
  toMatchURL(value: RegExp | string): Promise<R>
  /**
   * Will check an element's value on the page determined by the selector matches the given pattern.
   */
  toMatchValue(
    selector: string,
    value: RegExp | string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check an element's value matches the given pattern.
   */
  toMatchValue(
    value: RegExp | string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will compare the element's textContent on the page determined by the selector with the given text.
   * @deprecated - Use `toMatchText`
   */
  toEqualText(
    selector: string,
    value: string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will compare the element's textContent by the given text.
   * @deprecated - Use `toMatchText`
   */
  toEqualText(value: string, options?: PageWaitForSelectorOptions): Promise<R>
  /**
   * Will ensure that the element is on the page.
   */
  toHaveSelector(
    selector: string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check that an element on the page determined by the selector has focus.
   */
  toHaveFocus(
    selector: string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will check that an element has focus.
   */
  toHaveFocus(options?: PageWaitForSelectorOptions): Promise<R>
  /**
   * Will assert that N elements with the given selector are on the page and wait for it by default.
   * If its 0 elements, then it will throw since the element can't be found.
   */
  toHaveSelectorCount(
    selector: string,
    count: number,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will compare the element's value on the page determined by the selector with the given value.
   * @deprecated - use `toMatchValue` instead
   */
  toEqualValue(
    selector: string,
    value: string,
    options?: PageWaitForSelectorOptions
  ): Promise<R>
  /**
   * Will compare element's value with the given value.
   * @deprecated - use `toMatchValue` instead
   */
  toEqualValue(value: string, options?: PageWaitForSelectorOptions): Promise<R>
  /**
   * Will assert the given URL with the page's URL
   * @deprecated - use `toMatchURL` instead
   */
  toEqualUrl(value: string): Promise<R>
}

declare global {
  namespace jest {
    interface Matchers<R> extends PlaywrightMatchers<R> {}
  }

  namespace PlaywrightTest {
    interface Matchers<R> extends PlaywrightMatchers<R> {}
  }
}

export const matchers: any
