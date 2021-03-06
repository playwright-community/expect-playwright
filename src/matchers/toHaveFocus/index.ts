import { SyncExpectationResult } from 'expect/build/types'
import { quote } from '../utils'
import { Page } from 'playwright-core'
import { PageWaitForSelectorOptions } from '../../../global'

const toHaveFocus = async (page: Page, selector: string, options: PageWaitForSelectorOptions = {}): Promise<SyncExpectationResult> => {
  try {
    await page.waitForSelector(selector, options)
    /* istanbul ignore next */
    const isFocused = await page.$eval(selector, (el) => el === document.activeElement)
    if (isFocused) {
      return {
        pass: true,
        message: () => `${quote(selector)} has focus on it.`
      }
    }
    return {
      pass: false,
      message: () => `${quote(selector)} has not focus on it.`
    }
  } catch (err) {
    return {
      pass: false,
      message: () => `${quote(selector)} could not be found on the page.`
    }
  }
}

export default toHaveFocus
