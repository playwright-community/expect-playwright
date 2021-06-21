import matchers from "./matchers"
import { setPositiveDefaultTimeout, setNegativeDefaultTimeout } from './matchers/utils'

// @ts-ignore
if (typeof global.expect !== "undefined") {
  // @ts-ignore
  global.expect.extend(matchers)
}

export { 
  matchers,
  setNegativeDefaultTimeout,
  setPositiveDefaultTimeout,
}
