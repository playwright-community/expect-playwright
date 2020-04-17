import { SyncExpectationResult } from 'expect/build/types'
import { quote } from '../utils'
import { Page } from 'playwright-core'
import { PageWaitForSelectorOptions } from '../../../global'

const toHaveSelector = async (page: Page, selector: string, options: PageWaitForSelectorOptions = {}): Promise<SyncExpectationResult> => {
  try {
    await page.waitForSelector(selector, options)
    return {
      pass: true,
      message: () => `${quote(selector)} was found on the page.`
    }
  } catch (err) {
    return {
      pass: false,
      message: () => `${quote(selector)} could not be found on the page.'}`
    }
  }
}

export default toHaveSelector