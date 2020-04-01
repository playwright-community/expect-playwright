export { };

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveText(selectorOrValue: string, value?: string): Promise<R>;
    }
  }
}