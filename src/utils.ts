import { Page, ElementHandle } from "playwright-core"


const ExpectTypePage = "Page"
const ExpectTypeElementHandle = "ElementHandle"

type ExpectType = typeof ExpectTypePage | typeof ExpectTypeElementHandle

export type ExpectInputType = Page | ElementHandle

export const detectExpectType = (value: ExpectInputType): ExpectType => {
  const className = value.constructor.name
  switch (className) {
    case "Page":
      return ExpectTypePage
    case "ElementHandle":
      return ExpectTypeElementHandle
    default:
      throw new Error(`could not recognize type: ${className}`)
  }
}

interface getElementReturnValue {
  elementHandle: ElementHandle
  wasElement: boolean
}

export const getElement = async (value: ExpectInputType, selector: string): Promise<getElementReturnValue> => {
  const type = detectExpectType(value)
  if (type === ExpectTypeElementHandle) {
    return {
      elementHandle: value as ElementHandle,
      wasElement: true
    }
  }
  const page = value as Page
  return {
    elementHandle: await page.$(selector) as ElementHandle,
    wasElement: false
  }
}

export const quote = (val: string | null) => `'${val}'`