import { getElementText, InputArguments} from './utils'

describe("utils.getElementText", () => {
  it("should throw an error if the specified expect element was not recognized", async () => {
    class Test123 { }
    // @ts-ignore
    await expect(getElementText(new Test123(), "")).rejects.toThrowErrorMatchingSnapshot()
  })
  it("should throw an error if the input length was not in range", async () => {
    // @ts-ignore
    await expect(getElementText()).rejects.toThrowErrorMatchingSnapshot()
  })
})