import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'

import { authVar } from 'vars/authVar'

import { GenericPage } from 'containers/GenericPage/GenericPage'

export const AuthPage = () => {
  const location = useLocation()

  const isAuthenticated = useReactiveVar(authVar)

  if (isAuthenticated) {
    return <Navigate to={(location.state as { next?: string } | null)?.next || '/'} state={null} replace />
  }

  return <GenericPage />
}
