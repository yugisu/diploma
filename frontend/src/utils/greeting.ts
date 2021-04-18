import { getSharedGreeting } from '@diploma/shared'

export const getGreeting = () => getSharedGreeting().replace(/ shared/i, '')
