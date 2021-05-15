import React from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { Navigate, useLocation } from 'react-router-dom'

import { authVar } from 'vars/authVar'

import { GenericPage } from 'containers/GenericPage/GenericPage'

import * as Gql from './MainPage.graphql.module'

export const MainPage = () => {
  const location = useLocation()

  const isAuthenticated = useReactiveVar(authVar)

  const currentSessionQuery = useQuery(Gql.GetCurrentUserSessionDocument, {
    skip: !isAuthenticated,
  })
  const currentSession = currentSessionQuery.data?.currentUserSession

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ next: location.pathname }} replace />
  }

  if (!location.pathname.includes('workspace-selection') && currentSession && !currentSession.profileId) {
    return <Navigate to="/workspace-selection" state={{ next: location.pathname }} replace />
  }

  return <GenericPage />
}
