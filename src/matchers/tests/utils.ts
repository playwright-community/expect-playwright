import { SyncExpectationResult } from "expect/build/types"

export const testWrapper = (result: SyncExpectationResult) => {
  if (result.pass) {
    return true
  }
  return () => {
    throw new Error(result.message())
  }
}
