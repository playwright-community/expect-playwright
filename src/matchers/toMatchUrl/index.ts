import { SyncExpectationResult } from "expect/build/types"
import { compareText, ExpectInputType, getFrame, getMessage } from "../utils"

const toMatchURL: jest.CustomMatcher = async function (
  page: ExpectInputType,
  expectedUrl: RegExp | string
): Promise<SyncExpectationResult> {
  const frame = await getFrame(page)
  const actualUrl = frame!.url()

  return {
    pass: compareText(expectedUrl, actualUrl),
    message: () => getMessage(this, "toMatchURL", expectedUrl, actualUrl),
  }
}

export default toMatchURL
