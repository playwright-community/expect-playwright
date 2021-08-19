import type { Page, ElementHandle, Frame, Locator } from "playwright-core"
import { PageWaitForSelectorOptions } from "../../global"

type Handle = Page | Frame | ElementHandle | Locator
export type ExpectInputType = Handle | Promise<Handle>

const isElementHandle = (value: Handle): value is ElementHandle => {
  return value.constructor.name === "ElementHandle"
}

const isLocator = (value: Handle): value is Locator => {
  return value.constructor.name === "Locator"
}

export const getFrame = async (value: ExpectInputType) => {
  const resolved = await value
  return isElementHandle(resolved) ? resolved.contentFrame() : resolved
}

const isObject = (value: unknown) =>
  typeof value === "object" && !(value instanceof RegExp)

export type InputArguments = [
  ExpectInputType,
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
  let handle = await args[0]
  handle = (await getFrame(handle)) ?? handle

  if (isLocator(handle)) {
    handle = (await handle.elementHandle())!
  }
  // If the user provided a page or iframe, we need to locate the provided
  // selector or the `body` element if none was provided.
  else if (!isElementHandle(handle)) {
    const selector = args[1] ?? "body"

    try {
      handle = (await handle.waitForSelector(selector, options))!
    } catch (err) {
      throw new Error(`Timeout exceed for element ${quote(selector)}`)
    }
  }

  return [handle, expectedValue] as const
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
