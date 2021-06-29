import { SyncExpectationResult } from "expect/build/types"
import { PageWaitForSelectorOptions } from "../../../global"
import { ExpectInputType, getFrame, getMessage, quote } from "../utils"

const toHaveSelectorCount: jest.CustomMatcher = async function (
  arg: ExpectInputType,
  selector: string,
  expectedValue: number,
  options: PageWaitForSelectorOptions = {}
): Promise<SyncExpectationResult> {
  try {
    const frame = (await getFrame(arg))!
    await frame.waitForSelector(selector, { state: "attached", ...options })
    /* istanbul ignore next */
    const actualCount = await frame.$$eval(selector, (el) => el.length)

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
