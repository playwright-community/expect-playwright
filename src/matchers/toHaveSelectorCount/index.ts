import { SyncExpectationResult } from 'expect/build/types'
import { quote } from '../utils'
import { Page } from 'playwright-core'
import {PageWaitForSelectorOptions} from "../../../global";

const toHaveSelectorCount = async (page: Page, selector: string, expectedValue: number, options: PageWaitForSelectorOptions = {}): Promise<SyncExpectationResult> => {
  try {
    await page.waitForSelector(selector, {...options, state: 'attached'})
    const actualCount = (await page.$$(selector)).length
    if (actualCount === 0) {
      throw new Error('Element not found')
    }
    if (actualCount === expectedValue) {
      return {
        pass: true,
        message: () => `${quote(`${expectedValue}`)} does equal ${quote(`${actualCount}`)}.`
      }
    }
    return {
      pass: false,
      message: () => `${quote(`${expectedValue}`)} does not equal ${quote(`${actualCount}`)}${selector ? ' of ' + quote(selector) + "." : '.'}`
    }
  } catch (err) {
    return {
      pass: false,
      message: () => `${quote(selector)} could not be found on the page.`
    }
  }
}

export default toHaveSelectorCount
