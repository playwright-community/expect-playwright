import { SyncExpectationResult } from "expect/build/types"
import { getElementHandle, getMessage, InputArguments } from "../utils"

const toMatchText: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const [elementHandle, [expectedValue]] = await getElementHandle(args)
    /* istanbul ignore next */
    const actualTextContent = await elementHandle.evaluate(
      (el) => el.textContent
    )
    const res = actualTextContent?.match(expectedValue)

    return {
      pass: !!res,
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
