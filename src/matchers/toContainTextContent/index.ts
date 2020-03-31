import { ElementHandle, Page } from 'playwright-core'
import { AsyncExpectationResult } from 'expect/build/types'
import { getElement, quote } from '../../utils'

const toContainTextContentWrapper = async (pageOrElement: Page | ElementHandle, selectorOrValue: string, value: string): AsyncExpectationResult => {
  const { elementHandle, wasElement } = await getElement(pageOrElement, selectorOrValue)
  const textContent = wasElement ? selectorOrValue : value
  const actualTextContent = await elementHandle.evaluate((el) => el.textContent)
  if (actualTextContent?.includes(textContent)) {
    return {
      pass: true,
      message: () => `${quote(textContent)} is included in ${quote(actualTextContent)}.`
    }
  }
  return {
    pass: false,
    message: () => `${quote(textContent)} is not included in ${quote(actualTextContent)}${!wasElement ? ' of ' + quote(selectorOrValue) + "." : '.'}`
  }
}

export default toContainTextContentWrapper