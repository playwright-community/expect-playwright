import { SyncExpectationResult } from "expect/build/types"
import type { Page } from "playwright-core"
import { PageWaitForSelectorOptions } from "../../../global"
import { getElementText, getMessage } from "../utils"

const toBeDisabled: jest.CustomMatcher = async function (
  page: Page,
  selector: string,
  options: PageWaitForSelectorOptions = {}
): Promise<SyncExpectationResult> {
  try {
    const { elementHandle } = await getElementText(page, selector, options)
    const isDisabled = await elementHandle.isDisabled()

    return {
      pass: isDisabled,
      message: () => getMessage(this, "toBeDisabled", true, isDisabled),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toBeDisabled
