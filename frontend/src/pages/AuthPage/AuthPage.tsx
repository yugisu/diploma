import React from 'react'
import styled from 'styled-components'
import { Navigate, Route, Routes } from 'react-router-dom'

import { PageBody, PageContainer } from 'components/Layout/Layout'
import { Topbar } from 'components/Topbar/Topbar'

import { LoginCard } from './LoginCard'
import { RegistrationCard } from './RegistrationCard'
import { RegistrationSuccessCard } from './RegistrationSuccessCard'

export const AuthPage = () => {
  return (
    <PageContainer>
      <Topbar key="app-topbar" />

      <PageBody>
        <BodyContainerInner>
          <Routes>
            <Route path="login" element={<LoginCard />} />

            <Route path="registration" element={<RegistrationCard />} />

            <Route path="registration-success" element={<RegistrationSuccessCard />} />

            <Route path="*" element={<Navigate to="login" replace />} />
          </Routes>
        </BodyContainerInner>
      </PageBody>
    </PageContainer>
  )
}

const BodyContainerInner = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
