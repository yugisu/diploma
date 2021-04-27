import ky from 'ky'
import type { UserLoginModelT } from '@diploma/shared'

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
  }
}

const logout = async () => {
  await api.get(ApiRoutes.LOGOUT)

  localStorage.removeItem('identity')
  authVar(false)
}

export const authService = {
  checkToken,
  login,
  logout,
}
