import { SyncExpectationResult } from "expect/build/types"
import { getElementText, quote, InputArguments } from "../utils"

const toEqualText = async (
  ...args: InputArguments
): Promise<SyncExpectationResult> => {
  try {
    const { elementHandle, selector, expectedValue } = await getElementText(
      ...args
    )
    /* istanbul ignore next */
    const actualTextContent = await elementHandle.evaluate<string | null>(
      (el) => el.textContent
    )
    if (actualTextContent === expectedValue) {
      return {
        pass: true,
        message: () =>
          `${quote(expectedValue)} does equal ${quote(actualTextContent)}.`,
      }
    }
    return {
      pass: false,
      message: () =>
        `${quote(expectedValue)} does not equal ${quote(actualTextContent)}${
          selector ? " of " + quote(selector) + "." : "."
        }`,
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toEqualText
