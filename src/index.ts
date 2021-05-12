import matchers from "./matchers"
import type { Page, ElementHandle } from "playwright-core"
import type { PlaywrightMatchers } from "../global"

// @ts-ignore
if (typeof global.expect !== "undefined") {
  // @ts-ignore
  global.expect.extend(matchers)
}

const expectWrapper = (
  pageOrElement: Page | ElementHandle
): PlaywrightMatchers<boolean> =>
  Object.entries(matchers).reduce(
    (acc, [name, matcher]) => ({
      ...acc,
      [name]: async (...args: any[]) => {
        // @ts-ignore
        const result = await matcher(pageOrElement, ...args)
        if (!result.pass) {
          throw new Error(result.message())
        }
        return true
      },
    }),
    {} as PlaywrightMatchers<boolean>
  )

export = expectWrapper
