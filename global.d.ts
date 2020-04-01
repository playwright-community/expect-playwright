import { PageWaitForSelectorOptions } from "playwright-core";

export { };

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveText(selectorOrValue: string, value?: string): Promise<R>;
      toEqualText(selectorOrValue: string, value?: string): Promise<R>;
      toHaveSelector(selector: string, options: PageWaitForSelectorOptions): Promise<R>;
    }
  }
}