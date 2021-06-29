import { SyncExpectationResult } from "expect/build/types"
import { PageWaitForSelectorOptions } from "../../../global"
import { getElementHandle, getMessage, InputArguments } from "../utils"

const toHaveFocus: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const [elementHandle] = await getElementHandle(args, 0)
    /* istanbul ignore next */
    const isFocused = await elementHandle.evaluate(
      (el) => el === document.activeElement
    )

    return {
      pass: isFocused,
      message: () => getMessage(this, "toHaveFocus", true, isFocused, ""),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toHaveFocus
