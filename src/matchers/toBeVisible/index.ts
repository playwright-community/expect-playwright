import { SyncExpectationResult } from "expect/build/types"
import { getElement, getHintMessage, InputArguments } from "../utils"

const toBeVisible: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const { elementHandle } = await getElement(...args)
    const actualVisibility = await elementHandle.isVisible()

    return {
      pass: actualVisibility,
      message: () =>
      getHintMessage(this, 'toBeVisible'),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toBeVisible
