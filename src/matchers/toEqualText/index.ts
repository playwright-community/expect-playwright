import { SyncExpectationResult } from 'expect/build/types'
import { getElementText, quote, InputArguments, getMessage } from '../utils'

const toEqualText: jest.CustomMatcher = async function (...args: InputArguments): Promise<SyncExpectationResult>  {
  try {
    const { elementHandle, selector, expectedValue } = await getElementText(...args)
    const actualTextContent = await elementHandle.evaluate<string | null>((el) => el.textContent)

    return {
      pass: actualTextContent === expectedValue,
      message: getMessage(this, 'toEqualText', quote(expectedValue), quote(actualTextContent)),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString()
    }
  }
}

export default toEqualText
