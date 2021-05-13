import React from 'react'
import { Outlet } from 'react-router-dom'

import { PageBody, PageContainer } from 'components/Layout/Layout'
import { Topbar } from 'components/Topbar/Topbar'

type Props = {
  children?: React.ReactNode
}

export const GenericPage = ({ children }: Props) => {
  return (
    <PageContainer>
      <Topbar key="app-topbar" />

      <PageBody>{children || <Outlet />}</PageBody>
    </PageContainer>
  )
}
