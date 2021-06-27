import { SyncExpectationResult } from "expect/build/types"
import { Page, Frame } from "playwright-core"
import { compareText, ExpectInputType, getFrame, getMessage } from "../utils"

const toMatchTitle: jest.CustomMatcher = async function (
  page: ExpectInputType,
  expectedValue: RegExp | string
): Promise<SyncExpectationResult> {
  try {
    const frame = (await getFrame(page)) as Page | Frame
    const actualValue = await frame!.title()
    const pass = compareText(expectedValue, actualValue)

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
