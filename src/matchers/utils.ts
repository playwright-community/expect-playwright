import { Page, HTMLOrSVGElementHandle } from "playwright-core"

const ExpectTypePage = "Page"
const ExpectTypeElementHandle = "ElementHandle"

type ExpectType = typeof ExpectTypePage | typeof ExpectTypeElementHandle

export type ExpectInputType = Page | HTMLOrSVGElementHandle

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

interface getElementTextReturn {
  elementHandle: HTMLOrSVGElementHandle
  selector?: string
  value: string
}

export type InputArguments = [Page | HTMLOrSVGElementHandle, string?, string?]

export const getElementText = async (...args: InputArguments): Promise<getElementTextReturn> => {
  /**
  * Handle the following cases:
  * - expect(page, "bar")
  * - expect(element, "bar")
  */
  if (args.length === 2) {
    const type = detectExpectType(args[0])
    if (type === ExpectTypeElementHandle) {
      return {
        elementHandle: args[0] as HTMLOrSVGElementHandle,
        value: args[1] as string
      }
    }
    const page = args[0] as Page
    return {
      elementHandle: await page.$("body") as HTMLOrSVGElementHandle,
      value: args[1] as string
    }
  }
  /**
   * Handle the following case:
   * - expect(page, "#foo", "bar")
   */
  if (args.length === 3) {
    const selector = args[1]
    return {
      elementHandle: await args[0].$(selector as string) as HTMLOrSVGElementHandle,
      value: args[2] as string,
      selector
    }
  }
  throw new Error(`Invalid input length: ${args.length}`)
}

export const quote = (val: string | null) => `'${val}'`