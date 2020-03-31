export { };

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveTextContent(selectorOrValue: string, value?: string): Promise<R>;
    }
  }
}