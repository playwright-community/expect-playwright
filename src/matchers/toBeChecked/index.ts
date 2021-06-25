import { SyncExpectationResult } from "expect/build/types"
import { getElementText, getMessage, InputArguments } from "../utils"

const toBeChecked: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const { elementHandle } = await getElementText(...args)
    const isChecked = await elementHandle.isChecked()

    return {
      pass: isChecked,
      message: () => getMessage(this, "toBeChecked", true, isChecked),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toBeChecked
