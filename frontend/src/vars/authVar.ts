import { makeVar } from '@apollo/client'

export const authVar = makeVar<boolean | undefined>(Boolean(localStorage.getItem('identity')))
