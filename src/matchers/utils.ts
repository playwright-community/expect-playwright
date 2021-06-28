import type { Page, ElementHandle, Frame } from "playwright-core"
import { PageWaitForSelectorOptions } from "../../global"

export type ExpectInputType = Page | Frame | ElementHandle

const isElementHandle = (value: ExpectInputType): value is ElementHandle => {
  return value.constructor.name === "ElementHandle"
}

export const getFrame = async (value: ExpectInputType) => {
  return isElementHandle(value) ? value.contentFrame() : value
}

const isObject = (value: unknown) =>
  typeof value === "object" && !(value instanceof RegExp)

export type InputArguments = [
  Page | ElementHandle,
  string?,
  (string | PageWaitForSelectorOptions)?,
  PageWaitForSelectorOptions?
]

export const getElementHandle = async (
  args: InputArguments,
  valueArgCount = 1
) => {
  // Pluck the options off the end first
  const options =
    args.length > 1 && isObject(args[args.length - 1])
      ? (args.pop() as PageWaitForSelectorOptions)
      : {}

  // Next, pluck the number of args required by the matcher (defaults to 1)
  const expectedValue = args.splice(-valueArgCount, valueArgCount) as string[]

  // Finally, we can find the element handle
  let elementHandle = (await getFrame(args[0])) ?? args[0]

  // If the user provided a page or iframe, we need to locate the provided
  // selector or the `body` element if none was provided.
  if (!isElementHandle(elementHandle)) {
    const selector = args[1] ?? "body"

    try {
      elementHandle = (await elementHandle.waitForSelector(selector, options))!
    } catch (err) {
      throw new Error(`Timeout exceed for element ${quote(selector)}`)
    }
  }

  return [elementHandle, expectedValue] as const
}

export const quote = (val: string | null) => (val === null ? "" : `'${val}'`)

export const getMessage = (
  { isNot, promise, utils, expand }: jest.MatcherContext,
  matcher: string,
  expected: unknown,
  received: unknown,
  expectedHint: string | undefined = undefined
) => {
  const message = isNot
    ? `Expected: not ${utils.printExpected(expected)}`
    : utils.printDiffOrStringify(
        expected,
        received,
        "Expected",
        "Received",
        expand
      )

  return (
    utils.matcherHint(matcher, undefined, expectedHint, { isNot, promise }) +
    "\n\n" +
    message
  )
}

export const compareText = (
  expectedValue: string | RegExp,
  actualValue: string | null
) => {
  return typeof expectedValue === "string"
    ? expectedValue === actualValue
    : expectedValue.test(actualValue ?? "")
}
