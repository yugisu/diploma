import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthPage } from 'pages/AuthPage/AuthPage'
import { MainPage } from 'pages/MainPage/MainPage'
import { LoginView } from 'pages/AuthPage/LoginView'
import { RegistrationView } from 'pages/AuthPage/RegistrationView'
import { RegistrationSuccessView } from 'pages/AuthPage/RegistrationSuccessView'
import { WorkspaceSelectionView } from 'pages/MainPage/WorkspaceSelectionView'
import { ChatView } from 'pages/MainPage/ChatView'

import { GraphQLProvider } from 'containers/GraphQLProvider/GraphQLProvider'
import { Conversation } from 'containers/Conversation/Conversation'

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

        <Route path="chat" element={<ChatView />}>
          <Route path=":chatId" element={<Conversation />} />
          <Route path="/" element={<div>Select chat</div>} />
        </Route>

        <Route path="*" element={<Navigate to="chat" />} />
      </Route>
    </Routes>
  )
}
