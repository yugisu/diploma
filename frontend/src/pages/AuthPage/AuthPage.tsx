import React from 'react'
import styled from 'styled-components'
import { Link, Navigate, Route, Routes } from 'react-router-dom'

import { PageBody, PageContainer } from 'components/Layout/Layout'
import { Topbar } from 'components/Topbar/Topbar'

import { LoginCard } from './LoginCard'

export const AuthPage = () => {
  return (
    <PageContainer>
      <Topbar key="app-topbar" />

      <PageBody>
        <BodyContainerInner>
          <Routes>
            <Route path="login/" element={<LoginCard />} />

            <Route
              path="registration"
              element={
                <div>
                  <span>Registration</span>

                  <Link to="../login">Login with an existing account</Link>
                </div>
              }
            />

            <Route element={<Navigate to="login" replace />} />
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
