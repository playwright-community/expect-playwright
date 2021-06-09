import { SyncExpectationResult } from "expect/build/types"
import { getElementText, getMessage, InputArguments } from "../utils"

const toMatchText: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const { elementHandle, expectedValue } = await getElementText(...args)
    /* istanbul ignore next */
    const actualTextContent = await elementHandle.evaluate(
      (el) => el.textContent
    )
    const regex = expectedValue;
    const res = actualTextContent?.match(regex) || [];

    return {
      pass: res.length > 0,
      message: () =>
        getMessage(this, "toMatchText", expectedValue, actualTextContent),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toMatchText
