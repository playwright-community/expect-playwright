export { };

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainTextContent(selectorOrValue: string, value?: string): Promise<R>;
    }
  }
}