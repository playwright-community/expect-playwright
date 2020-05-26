// copied into our codebase for autocompletion purposes
interface PageWaitForSelectorOptions {
  /**
   * Wait for element to become visible (`visible`), hidden (`hidden`), present in dom (`attached`) or not present in dom (`detached`). Defaults to `visible`.
   */
  state?: "attached" | "detached" | "visible" | "hidden";

  /**
   * Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the browserContext.setDefaultTimeout(timeout) or page.setDefaultTimeout(timeout) methods.
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
  toHaveText(value: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will compare the element's textContent on the page determined by the selector with the given text.
  */
  toEqualText(selector: string, value: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will compare the element's textContent by the given text.
  */
  toEqualText(value: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will ensure that the element is one the page in a given timeout (default 1 second).
  */
  toHaveSelector(selector: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will compare the element's value on the page determined by the selector with the given value.
  */
  toEqualValue(selector: string, value: string, options?: PageWaitForSelectorOptions): Promise<R>;
  /**
  * Will compare element's value with the given value.
  */
  toEqualValue(value: string, options?: PageWaitForSelectorOptions): Promise<R>;
}

declare global {
  namespace jest {
    interface Matchers<R> extends PlaywrightMatchers<R> { }
  }
}

