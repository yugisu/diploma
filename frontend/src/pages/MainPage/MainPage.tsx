import React from 'react'

import { authService } from 'services/authService'

export const MainPage = () => {
  return (
    <div>
      <button type="button" onClick={() => authService.logout()}>
        Logout
      </button>
    </div>
  )
}
