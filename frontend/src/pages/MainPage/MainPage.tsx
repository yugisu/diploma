import React from 'react'
import { gql, useQuery } from '@apollo/client'

import { PageBody, PageContainer } from 'components/Layout/Layout'
import { Topbar } from 'components/Topbar/Topbar'

const CURRENT_USER_QUERY = gql`
  query getCurrentUserSession {
    currentUserSession {
      id
      user {
        id
        name
      }
      profile {
        id
      }
    }
  }
`

export const MainPage = () => {
  const currentSessionQuery = useQuery(CURRENT_USER_QUERY)

  return (
    <PageContainer>
      <Topbar key="app-topbar" />

      <PageBody>
        <h1>Hello!</h1>

        <div>{JSON.stringify(currentSessionQuery.data, null, 2)}</div>
      </PageBody>
    </PageContainer>
  )
}
