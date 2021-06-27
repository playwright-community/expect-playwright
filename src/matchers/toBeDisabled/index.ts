import { SyncExpectationResult } from "expect/build/types"
import { getElementHandle, getMessage, InputArguments } from "../utils"

const toBeDisabled: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const [elementHandle] = await getElementHandle(args, 0)
    const isDisabled = await elementHandle.isDisabled()

    return {
      pass: isDisabled,
      message: () => getMessage(this, "toBeDisabled", true, isDisabled, ""),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toBeDisabled
