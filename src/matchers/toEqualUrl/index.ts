import { SyncExpectationResult } from "expect/build/types"
import { ExpectInputType, getFrame, getMessage } from "../utils"

const toEqualUrl: jest.CustomMatcher = async function (
  page: ExpectInputType,
  expectedUrl: string
): Promise<SyncExpectationResult> {
  const frame = await getFrame(page)
  const actualUrl = frame!.url()

  return {
    pass: actualUrl === expectedUrl,
    message: () => getMessage(this, "toEqualUrl", expectedUrl, actualUrl),
  }
}

export default toEqualUrl
