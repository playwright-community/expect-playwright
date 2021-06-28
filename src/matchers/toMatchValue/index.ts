import { SyncExpectationResult } from "expect/build/types"
import {
  compareText,
  getElementHandle,
  getMessage,
  InputArguments,
} from "../utils"

const toMatchValue: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const [elementHandle, [expectedValue]] = await getElementHandle(args)
    /* istanbul ignore next */
    const actualValue = await elementHandle.evaluate(
      (el) => (el as HTMLInputElement).value
    )

    return {
      pass: compareText(expectedValue, actualValue),
      message: () =>
        getMessage(this, "toMatchValue", expectedValue, actualValue),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toMatchValue
