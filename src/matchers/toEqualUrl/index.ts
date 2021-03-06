import { SyncExpectationResult } from 'expect/build/types'
import { Page } from 'playwright-core'
import { getElementText, quote } from '../utils'

const toEqualUrl = async (page: Page, expectedUrl: string): Promise<SyncExpectationResult> => {
  const actualUrl = page.url()
  if (actualUrl === expectedUrl) {
    return {
      pass: true,
      message: () => `${quote(expectedUrl)} matches the given Url.`
    }
  }
  return {
    pass: false,
    message: () => `${quote(expectedUrl)} expects not the current Url: ${quote(actualUrl)}`
  }
}

export default toEqualUrl