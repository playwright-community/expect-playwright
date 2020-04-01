import { AsyncExpectationResult } from 'expect/build/types'
import { getElementText, quote, InputArguments } from '../utils'


const toHaveText = async (...args: InputArguments): AsyncExpectationResult => {
  const { elementHandle, selector, value } = await getElementText(...args)
  /* istanbul ignore next */
  const actualTextContent = await elementHandle.evaluate((el) => el.textContent)
  if (actualTextContent?.includes(value)) {
    return {
      pass: true,
      message: () => `${quote(value)} is included in ${quote(actualTextContent)}.`
    }
  }
  return {
    pass: false,
    message: () => `${quote(value)} is not included in ${quote(actualTextContent)}${selector ? ' of ' + quote(selector) + "." : '.'}`
  }
}

export default toHaveText