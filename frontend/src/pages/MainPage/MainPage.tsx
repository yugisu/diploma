import React from 'react'

import { authService } from 'services/authService'

import { PageBody, PageContainer } from 'components/Layout/Layout'
import { Topbar } from 'components/Topbar/Topbar'

export const MainPage = () => {
  return (
    <PageContainer>
      <Topbar key="app-topbar" />

      <PageBody>
        <button type="button" onClick={() => authService.logout()}>
          Logout
        </button>
      </PageBody>
    </PageContainer>
  )
}
