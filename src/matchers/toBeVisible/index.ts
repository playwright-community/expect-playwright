import { SyncExpectationResult } from "expect/build/types"
import { getElement, getExpectedMessage, InputArguments } from "../utils"

const toBeVisible: jest.CustomMatcher = async function (
  ...args: InputArguments
): Promise<SyncExpectationResult> {
  try {
    const { elementHandle } = await getElement(...args)
    const actualVisibility = await elementHandle.isVisible()

    return {
      pass: actualVisibility,
      message: () =>
        getExpectedMessage(this, 'toBeVisible'),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toBeVisible
