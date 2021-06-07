import { SyncExpectationResult } from "expect/build/types"
import { getElementText, getMessage, InputArguments } from "../utils"

const toHaveText: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const { elementHandle, expectedValue } = await getElementText(...args)
    /* istanbul ignore next */
    const actualTextContent = await elementHandle.evaluate(
      (el) => el.textContent
    )

    return {
      pass: !!actualTextContent?.includes(expectedValue),
      message: () =>
        getMessage(this, "toHaveText", expectedValue, actualTextContent),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toHaveText
