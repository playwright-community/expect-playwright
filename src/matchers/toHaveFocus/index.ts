import { SyncExpectationResult } from "expect/build/types"
import { getMessage, quote } from "../utils"
import { Page } from "playwright-core"
import { PageWaitForSelectorOptions } from "../../../global"

const enum FailureReason {
  NotFound,
  NotFocused,
}

async function isFocused(
  page: Page,
  selector: string,
  options: PageWaitForSelectorOptions = {}
) {
  try {
    await page.waitForSelector(selector, options)
    /* istanbul ignore next */
    const isFocused = await page.$eval(
      selector,
      (el) => el === document.activeElement
    )

    return { pass: isFocused, reason: FailureReason.NotFocused }
  } catch (e) {
    return { pass: false, reason: FailureReason.NotFound }
  }
}

const toHaveFocus: jest.CustomMatcher = async function (
  page: Page,
  selector: string,
  options: PageWaitForSelectorOptions = {}
): Promise<SyncExpectationResult> {
  const result = await isFocused(page, selector, options)

  return {
    pass: result.pass,
    message: () => {
      const not = this.isNot ? " not" : ""
      const hint = this.utils.matcherHint("toHaveFocus", undefined, undefined, {
        isNot: this.isNot,
        promise: this.promise,
      })

      const message =
        result.reason === FailureReason.NotFound
          ? `Expected: element to${not} have focus\n` +
            "Received: element was not found"
          : `Expected: element to${not} have focus`

      return hint + "\n\n" + message
    },
  }
}

export default toHaveFocus
