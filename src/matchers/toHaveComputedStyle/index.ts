import { SyncExpectationResult } from "expect/build/types"
import { getElementHandle, getMessage, InputArguments } from "../utils"

const toHaveComputedStyle: jest.CustomMatcher = async function (
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
      pass: expectedValue === actualValue,
      message: () =>
        getMessage(this, "toHaveComputedStyle", expectedValue, actualValue),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toHaveComputedStyle