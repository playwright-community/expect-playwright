import { SyncExpectationResult } from 'expect/build/types'
import { getElementText, quote, InputArguments } from '../utils'

const toHaveText = async (...args: InputArguments): Promise<SyncExpectationResult> => {
  const { elementHandle, selector, expectedValue } = await getElementText(...args)
  /* istanbul ignore next */
  const actualTextContent = await elementHandle.evaluate((el) => el.textContent)
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
}

export default toHaveText