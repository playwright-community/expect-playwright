import { ElementHandle, Page } from 'playwright-core'
import { AsyncExpectationResult } from 'expect/build/types'
import { getElement } from '../../utils'

type toHaveTextContentProp = string

const toHaveTextContentWrapper = async (pageOrElement: Page | ElementHandle, selectorOrValue: string, value: toHaveTextContentProp): AsyncExpectationResult => {
  const { elementHandle, wasElement } = await getElement(pageOrElement, selectorOrValue)
  const textContent = wasElement ? selectorOrValue : value
  const pass = await elementHandle.evaluate((el, [content]) => {
    if (!el.textContent) {
      return false
    }
    return el.textContent.includes(content)
  }, [textContent])
  return {
    pass,
    message: ()=>"foo"
  }
}

export default toHaveTextContentWrapper