import { SyncExpectationResult } from "expect/build/types"
import { Page, Frame } from "playwright-core"
import { ExpectInputType, getFrame, getMessage } from "../utils"

const toMatchUrl: jest.CustomMatcher = async function (
  page: ExpectInputType,
  expectedUrl: string
): Promise<SyncExpectationResult> {
  const frame = (await getFrame(page)) as Page | Frame
  const actualUrl = frame!.url()

  return {
    pass: actualUrl === expectedUrl,
    message: () => getMessage(this, "toMatchUrl", expectedUrl, actualUrl),
  }
}

export default toMatchUrl
