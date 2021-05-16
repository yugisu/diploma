import { makeVar } from '@apollo/client'

export const authVar = makeVar<boolean | undefined>(localStorage.getItem('identity') ? undefined : false)
