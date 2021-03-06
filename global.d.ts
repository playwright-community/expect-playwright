// copied into our codebase for autocompletion purposes
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
  state?: "attached" | "detached" | "visible" | "hidden";

  /**
   * Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by
   * using the
   * [browserContext.setDefaultTimeout(…)](https://github.com/microsoft/playwright/blob/master/docs/api.md#browsercontextsetdefaulttimeout)
   * or [page.setDefaultTimeout(…)](https://github.com/microsoft/playwright/blob/master/docs/api.md#pagesetdefaulttimeout)
   * methods.
   */
  timeout?: number;
}

export interface PlaywrightMatchers<R> {
  /**
  * Will check if the element's textContent on the page determined by the selector includes the given text.
  */
  toHaveText(selector: string, value: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will check if the element's value includes the given text.
  */
  toHaveText(value: string): Promise<R>;
  /**
  * Will compare the element's textContent on the page determined by the selector with the given text.
  */
  toEqualText(selector: string, value: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will compare the element's textContent by the given text.
  */
  toEqualText(value: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will ensure that the element is on the page.
  */
  toHaveSelector(selector: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
   * Will ensure that the element has focus.
   */
  toHaveFocus(selector: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
   * Will assert that N elements with the given selector are on the page and wait for it by default.
   * If its 0 elements, then it will throw since the element can't be found.
   */
  toHaveSelectorCount(selector: string, count: number, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will compare the element's value on the page determined by the selector with the given value.
  */
  toEqualValue(selector: string, value: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will compare element's value with the given value.
  */
  toEqualValue(value: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will assert the given URL with the page's URL
  */
  toEqualUrl(value: string): Promise<R>;
}

declare global {
  namespace jest {
    interface Matchers<R> extends PlaywrightMatchers<R> { }
  }
}
