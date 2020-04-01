import { AsyncExpectationResult } from 'expect/build/types'
import { quote } from '../utils'
import { Page, PageWaitForSelectorOptions } from 'playwright-core'

const toHaveSelector = async (page: Page, selector: string, options: PageWaitForSelectorOptions = { timeout: 1 * 1000 }): AsyncExpectationResult => {
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