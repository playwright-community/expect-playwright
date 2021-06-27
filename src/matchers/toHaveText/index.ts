import { SyncExpectationResult } from "expect/build/types"
import { getElementHandle, getMessage, InputArguments } from "../utils"

/**
 * Will check if the element's textContent on the page determined by the selector includes the given text.
 * @deprecated Use toMatchText instead
 */
const toHaveText: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const [elementHandle, [expectedValue]] = await getElementHandle(args)
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
