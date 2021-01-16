import { SyncExpectationResult } from 'expect/build/types'
import { getElementText, quote, InputArguments, ExpectType } from '../utils'

const MAX_LENGTH = 100

const getResultText = (actualTextContent: string, type: ExpectType, selector?: string) => {
  if (type === "Page") {
    return selector ?
        `${actualTextContent.length < MAX_LENGTH ? 
            quote(actualTextContent) : 'content'} of ${quote(selector)} selector` : 'page content'
  }
  if (type === "ElementHandle") {
    return selector && actualTextContent.length < MAX_LENGTH ? quote(actualTextContent) : 'element content'
  }
  return ''
}

const toHaveText = async (...args: InputArguments): Promise<SyncExpectationResult> => {
  try {
    const { elementHandle, selector, type, expectedValue } = await getElementText(...args)
    /* istanbul ignore next */
    const actualTextContent = await elementHandle.evaluate((el) => el.textContent) || ''
    const resultTextText = getResultText(actualTextContent, type, selector)
    if (actualTextContent?.includes(expectedValue)) {
      return {
        pass: true,
        message: () => `${quote(expectedValue)} is included in ${resultTextText}.`
      }
    }
    return {
      pass: false,
      message: () => `${quote(expectedValue)} is not included in ${resultTextText}`
    }
  } catch (err) {
    return {
      pass: false,
      message: () => err.toString()
    }
  }
}

export default toHaveText
