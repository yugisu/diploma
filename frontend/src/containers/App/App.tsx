import React, { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import { Themes } from 'styles/theme'
import { authService } from 'services/authService'
import { authVar } from 'vars/authVar'
import { preferredThemeVar } from 'vars/preferredThemeVar'

import { AuthPage } from 'pages/AuthPage/AuthPage'
import { MainPage } from 'pages/MainPage/MainPage'

export const App = () => {
  useEffect(() => void authService.checkToken(), [])
  const isAuthenticated = useReactiveVar(authVar)

  const preferredTheme = useReactiveVar(preferredThemeVar)

  return (
    <ThemeProvider theme={Themes[preferredTheme]}>
      <BrowserRouter>
        {isAuthenticated !== undefined && (
          <Routes>
            <Route path="auth/*" element={isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />} />

            <Route path="/*" element={!isAuthenticated ? <Navigate to="/auth" replace /> : <MainPage />} />
          </Routes>
        )}
      </BrowserRouter>
    </ThemeProvider>
  )
}
