/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  type ExtractProps<T extends (...args: any[]) => any> = Parameters<T>[0]
}

export {}
