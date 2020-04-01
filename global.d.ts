export { };

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveText(selectorOrValue: string, value?: string): Promise<R>;
      toEqualText(selectorOrValue: string, value?: string): Promise<R>;
    }
  }
}