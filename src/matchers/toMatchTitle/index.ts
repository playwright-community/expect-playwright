import { SyncExpectationResult } from "expect/build/types"
import { ExpectInputType, getFrame, getMessage } from "../utils"

const toMatchTitle: jest.CustomMatcher = async function (
  page: ExpectInputType,
  expectedValue: RegExp | string
): Promise<SyncExpectationResult> {
  try {
    const frame = await getFrame(page)
    const actualValue = await frame!.title()
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
