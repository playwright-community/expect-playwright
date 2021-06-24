import { SyncExpectationResult } from "expect/build/types"
import type { Page } from "playwright-core"
import { PageWaitForSelectorOptions } from "../../../global"
import { getElementText, getMessage } from "../utils"

const toBeEnabled: jest.CustomMatcher = async function (
  page: Page,
  selector: string,
  options: PageWaitForSelectorOptions = {}
): Promise<SyncExpectationResult> {
  try {
    const { elementHandle } = await getElementText(page, selector, options)
    const isEnabled = await elementHandle.isEnabled()

    return {
      pass: isEnabled,
      message: () => getMessage(this, "toBeEnabled", true, isEnabled),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toBeEnabled
