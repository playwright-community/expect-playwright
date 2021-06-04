import { SyncExpectationResult } from "expect/build/types"
import { Page } from "playwright-core"
import { getMessage } from "../utils"

const toEqualUrl: jest.CustomMatcher = async function (
  page: Page,
  expectedUrl: string
): Promise<SyncExpectationResult> {
  const actualUrl = page.url()

  return {
    pass: actualUrl === expectedUrl,
    message: () => getMessage(this, "toEqualUrl", expectedUrl, actualUrl),
  }
}

export default toEqualUrl
