import { SyncExpectationResult } from "expect/build/types"
import { getElementHandle, getMessage, InputArguments } from "../utils"

const toBeEnabled: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const [elementHandle] = await getElementHandle(args, 0)
    const isEnabled = await elementHandle.isEnabled()

    return {
      pass: isEnabled,
      message: () => getMessage(this, "toBeEnabled", true, isEnabled, ""),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toBeEnabled
