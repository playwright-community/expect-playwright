import { PageWaitForSelectorOptions } from "playwright-core";

export { };

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveText(selector: string, value: string, options?: PageWaitForSelectorOptions): Promise<R>;
      toHaveText(value: string, options?: PageWaitForSelectorOptions): Promise<R>;
      toEqualText(selector: string, value: string, options?: PageWaitForSelectorOptions): Promise<R>;
      toEqualText(value: string, options?: PageWaitForSelectorOptions): Promise<R>;
      toHaveSelector(selector: string, options?: PageWaitForSelectorOptions): Promise<R>;
    }
  }
}