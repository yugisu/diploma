import React from 'react'
import { gql, useQuery, useReactiveVar } from '@apollo/client'
import { Navigate, useLocation } from 'react-router-dom'

import { GetCurrentUserSessionDocument } from 'generated/graphql-query-types'
import { authVar } from 'vars/authVar'

import { GenericPage } from 'containers/GenericPage/GenericPage'

const CURRENT_USER_QUERY = gql`
  query getCurrentUserSession {
    currentUserSession {
      id
      profile {
        id
      }
    }
  }
` as typeof GetCurrentUserSessionDocument

export const MainPage = () => {
  const location = useLocation()

  const isAuthenticated = useReactiveVar(authVar)

  const currentSessionQuery = useQuery(CURRENT_USER_QUERY, {
    skip: !isAuthenticated,
  })
  const currentSession = currentSessionQuery.data?.currentUserSession

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ next: location.pathname }} replace />
  }

  if (location.pathname !== '/workspace-selection' && currentSession && !currentSession.profile) {
    return <Navigate to="/workspace-selection" />
  }

  return <GenericPage />
}
