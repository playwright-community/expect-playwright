import { SyncExpectationResult } from "expect/build/types"
import type { Page } from "playwright-core"
import { PageWaitForSelectorOptions } from "../../../global"

const toHaveSelector: jest.CustomMatcher = async function (
  page: Page,
  selector: string,
  options: PageWaitForSelectorOptions = {}
): Promise<SyncExpectationResult> {
  const pass = await page
    .waitForSelector(selector, {
      state: this.isNot ? "hidden" : "visible",
      ...options,
    })
    .then(() => !this.isNot)
    .catch(() => this.isNot)

  return {
    pass: pass,
    message: () => {
      const not = this.isNot ? " not" : ""
      const hint = this.utils.matcherHint(
        "toHaveSelector",
        undefined,
        undefined,
        { isNot: this.isNot, promise: this.promise }
      )

      return (
        hint +
        "\n\n" +
        `Expected: page to${not} have selector ${this.utils.printExpected(
          selector
        )}`
      )
    },
  }
}

export default toHaveSelector
