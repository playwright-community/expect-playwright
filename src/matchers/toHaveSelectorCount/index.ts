import { SyncExpectationResult } from 'expect/build/types'
import { quote } from '../utils'
import { Page } from 'playwright-core'

const toHaveSelectorCount = async (page: Page, selector: string, expectedValue: number): Promise<SyncExpectationResult> => {
  try {
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
