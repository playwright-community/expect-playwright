import { SyncExpectationResult } from "expect/build/types"
import {
  compareText,
  getElementHandle,
  getMessage,
  InputArguments,
} from "../utils"

const toMatchComputedStyle: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const [elementHandle, [property, expectedValue]] = await getElementHandle(
      args,
      2
    )
    /* istanbul ignore next */
    const actualValue = await elementHandle.evaluate(
      (el, property) => getComputedStyle(el as HTMLElement)[property],
      property as keyof CSSStyleDeclaration
    )

    return {
      pass: compareText(expectedValue, actualValue),
      message: () =>
        getMessage(this, "toMatchComputedStyle", expectedValue, actualValue),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toMatchComputedStyle
