import { SyncExpectationResult } from "expect/build/types"
import type { Page } from "playwright-core"
import { getMessage } from "../utils"

const toMatchTitle: jest.CustomMatcher = async function (
  page: Page,
  expectedValue: RegExp | string
): Promise<SyncExpectationResult> {
  try {
    const actualValue = await page.title()
    const pass =
      typeof expectedValue === "string"
        ? expectedValue === actualValue
        : expectedValue.test(actualValue)

    return {
      pass,
      message: () =>
        getMessage(this, "toMatchTitle", expectedValue, actualValue),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString(),
    }
  }
}

export default toMatchTitle
