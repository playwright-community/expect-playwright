import { SyncExpectationResult } from "expect/build/types"
import {
  compareText,
  getElementText,
  getMessage,
  InputArguments,
} from "../utils"

const toMatchText: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const { elementHandle, expectedValue } = await getElementText(...args)
    /* istanbul ignore next */
    const actualValue = await elementHandle.evaluate((el) => el.textContent)
    const pass = compareText(expectedValue, actualValue)

    return {
      pass,
      message: () =>
        getMessage(this, "toMatchText", expectedValue, actualValue),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toMatchText
