export const assertSnapshot = async (fn: () => Promise<void>) => {
  await expect(fn).rejects.toThrowErrorMatchingSnapshot()
}
