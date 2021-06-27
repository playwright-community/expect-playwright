import { SyncExpectationResult } from "expect/build/types"
import {
  compareText,
  getElementHandle,
  getMessage,
  InputArguments,
} from "../utils"

const toMatchAttribute: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const [elementHandle, [attribute, expectedValue]] = await getElementHandle(
      args,
      2
    )
    const actualValue = await elementHandle.getAttribute(attribute)

    return {
      pass: compareText(expectedValue, actualValue),
      message: () =>
        getMessage(this, "toMatchAttribute", expectedValue, actualValue),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toMatchAttribute
