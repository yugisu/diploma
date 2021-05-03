import ky from 'ky'
import type { UserLoginModelT, UserRegistrationModelT } from '@diploma/shared'

import { ApiRoutes } from 'constants/apiRoutes'
import { authVar } from 'vars/authVar'

import { api } from './api'

const checkToken = async () => {
  try {
    await api.get(ApiRoutes.PING)

    authVar(Boolean(localStorage.getItem('identity')))
  } catch (error) {
    if (error instanceof ky.HTTPError) {
      if (error.response.status === 401) {
        localStorage.removeItem('identity')
        authVar(false)
      }

      throw error
    }
  }
}

const login = async (loginData: UserLoginModelT) => {
  try {
    const { token } = await api.post(ApiRoutes.LOGIN, { json: loginData }).json<{ token: string }>()

    localStorage.setItem('identity', token)

    authVar(true)
  } catch (error) {
    localStorage.removeItem('identity')
    authVar(false)

    throw error
  }
}

const createAccount = async (data: UserRegistrationModelT) => {
  await api.post(ApiRoutes.REGISTRATION, { json: data })
}

const logout = async () => {
  try {
    await api.get(ApiRoutes.LOGOUT)
  } finally {
    localStorage.removeItem('identity')
    authVar(false)
  }
}

export const authService = {
  checkToken,
  login,
  createAccount,
  logout,
}
