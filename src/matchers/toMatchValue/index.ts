import { SyncExpectationResult } from "expect/build/types"
import { getElementHandle, getMessage, InputArguments } from "../utils"

const toMatchValue: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const [elementHandle, [expectedValue]] = await getElementHandle(args)
    /* istanbul ignore next */
    const actualTextContent = await elementHandle.evaluate(
      (el) => (el as HTMLInputElement).value
    )

    return {
      pass: actualTextContent?.includes(expectedValue),
      message: () =>
        getMessage(this, "toMatchValue", expectedValue, actualTextContent),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toMatchValue
