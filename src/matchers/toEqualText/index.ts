import { SyncExpectationResult } from 'expect/build/types'
import { getElementText, getMessage, InputArguments } from '../utils'

const toEqualText: jest.CustomMatcher = async function (...args: InputArguments): Promise<SyncExpectationResult>  {
  try {
    const { elementHandle, expectedValue } = await getElementText(...args)
    const actualTextContent = await elementHandle.evaluate<string | null>((el) => el.textContent)

    return {
      pass: actualTextContent === expectedValue,
      message: getMessage(this, 'toEqualText', expectedValue, actualTextContent),
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString()
    }
  }
}

export default toEqualText
