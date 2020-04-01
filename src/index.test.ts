import matchers from './matchers';

import "."

describe("expect-playwright", ()=> {
  it("should apply the functions", ()=> {
    for (let matcher in matchers) {
      // @ts-ignore
      expect(expect(null)[matcher]).not.toBeUndefined()
    }
  })
})