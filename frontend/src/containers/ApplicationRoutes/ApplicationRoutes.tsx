import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthPage } from 'pages/AuthPage/AuthPage'
import { MainPage } from 'pages/MainPage/MainPage'
import { LoginView } from 'pages/AuthPage/LoginView'
import { RegistrationView } from 'pages/AuthPage/RegistrationView'
import { RegistrationSuccessView } from 'pages/AuthPage/RegistrationSuccessView'
import { WorkspaceSelectionView } from 'pages/MainPage/WorkspaceSelectionView'

import { GraphQLProvider } from 'containers/GraphQLProvider/GraphQLProvider'

export const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthPage />}>
        <Route path="login" element={<LoginView />} />
        <Route path="registration" element={<RegistrationView />} />
        <Route path="registration-success" element={<RegistrationSuccessView />} />
      </Route>

      <Route
        path="*"
        element={
          <GraphQLProvider>
            <MainPage />
          </GraphQLProvider>
        }
      >
        <Route path="workspace-selection" element={<WorkspaceSelectionView />} />

        <Route path="*" element={<div>Main page content</div>} />
      </Route>
    </Routes>
  )
}
