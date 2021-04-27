import React from 'react'
import styled from 'styled-components'

import { authService } from 'services/authService'

export const AuthPage = () => {
  return (
    <Container>
      <button type="button" onClick={() => authService.login({ email: 'test@email.com', password: '12345678' })}>
        Login
      </button>
    </Container>
  )
}

const Container = styled.div``
