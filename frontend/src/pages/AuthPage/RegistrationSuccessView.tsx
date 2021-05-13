import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from 'components/Common/Button'

export const RegistrationSuccessView = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-md w-full">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl mb-3 opacity-80">Account created!</h1>

        <span>
          <span className="opacity-90">Now you can use the app!</span>
        </span>
      </div>

      <Button onClick={() => navigate('/auth/login', { replace: true })} primary className="w-full">
        Go to the login page
      </Button>
    </div>
  )
}
