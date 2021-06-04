import { SyncExpectationResult } from "expect/build/types"
import { quote } from "../utils"
import { Page } from "playwright-core"
import { PageWaitForSelectorOptions } from "../../../global"

const toHaveSelector: jest.CustomMatcher = async function (
  page: Page,
  selector: string,
  options: PageWaitForSelectorOptions = {}
): Promise<SyncExpectationResult> {
  const pass = await page
    .waitForSelector(selector, options)
    .then(() => true)
    .catch(() => false)

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
