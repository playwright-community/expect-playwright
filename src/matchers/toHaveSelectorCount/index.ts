import { SyncExpectationResult } from "expect/build/types"
import { getMessage, quote } from "../utils"
import type { Page } from "playwright-core"
import { PageWaitForSelectorOptions } from "../../../global"

const toHaveSelectorCount: jest.CustomMatcher = async function (
  page: Page,
  selector: string,
  expectedValue: number,
  options: PageWaitForSelectorOptions = {}
): Promise<SyncExpectationResult> {
  try {
    await page.waitForSelector(selector, { state: "attached", ...options })
    /* istanbul ignore next */
    const actualCount = await page.$$eval(selector, (el) => el.length)

    return {
      pass: actualCount === expectedValue,
      message: () =>
        getMessage(this, "toHaveSelectorCount", expectedValue, actualCount),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => `${quote(selector)} could not be found on the page.`,
    }
  }
}

export default toHaveSelectorCount
