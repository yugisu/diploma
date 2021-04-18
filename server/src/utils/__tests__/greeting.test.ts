import { getGreeting } from '../greeting'

describe('greeting.ts', () => {
  describe('getHello()', () => {
    it('Should return greeting', () => {
      expect(getGreeting()).toMatch(/hello/i)
    })
  })
})
