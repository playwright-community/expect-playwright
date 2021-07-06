import { SyncExpectationResult } from "expect/build/types"
import { PageWaitForSelectorOptions } from "../../../global"
import { ExpectInputType, getElementHandle } from "../utils"

const toHaveSelector: jest.CustomMatcher = async function (
  arg: ExpectInputType,
  selector: string,
  options: PageWaitForSelectorOptions = {}
): Promise<SyncExpectationResult> {
  const pass = await getElementHandle(
    [
      arg,
      selector,
      {
        state: this.isNot ? "hidden" : "visible",
        ...options,
      },
    ],
    0
  )
    .then(() => !this.isNot)
    .catch(() => this.isNot)

  return {
    pass: pass,
    message: () => {
      const not = this.isNot ? " not" : ""
      const hint = this.utils.matcherHint(
        "toHaveSelector",
        undefined,
        undefined,
        { isNot: this.isNot, promise: this.promise }
      )

      return (
        hint +
        "\n\n" +
        `Expected: page to${not} have selector ${this.utils.printExpected(
          selector
        )}`
      )
    },
  }
}

export default toHaveSelector
