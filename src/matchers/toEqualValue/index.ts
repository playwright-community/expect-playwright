import { SyncExpectationResult } from 'expect/build/types'
import { getElementText, quote, InputArguments } from '../utils'

const toEqualValue = async (...args: InputArguments): Promise<SyncExpectationResult> => {
  try {
    const { elementHandle, selector, expectedValue } = await getElementText(...args)
    /* istanbul ignore next */
    const actualTextContent = await elementHandle.evaluate((el) => (el as HTMLInputElement).value)
    if (actualTextContent?.includes(expectedValue)) {
      return {
        pass: true,
        message: () => `${quote(expectedValue)} is included in ${quote(actualTextContent)}.`
      }
    }
    return {
      pass: false,
      message: () => `${quote(expectedValue)} is not included in ${quote(actualTextContent)}${selector ? ' of ' + quote(selector) + "." : '.'}`
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString()
    }
  }
}

export default toEqualValue