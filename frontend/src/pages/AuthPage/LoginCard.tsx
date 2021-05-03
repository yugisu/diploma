import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import type { UserLoginModelT } from '@diploma/shared'

import { authService } from 'services/authService'

import { InputLabel } from 'components/Common/InputLabel'
import { Input } from 'components/Common/Input'
import { Button } from 'components/Common/Button'

export const LoginCard = () => {
  const f = useFormik<UserLoginModelT>({
    initialValues: { email: '', password: '' },
    onSubmit: async (valuesToSubmit, { setSubmitting }) => {
      await authService.login(valuesToSubmit)

      setSubmitting(false)
    },
  })

  return (
    <form className="max-w-md w-full" onSubmit={f.handleSubmit}>
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-7xl mb-3 opacity-80">Sign in</h1>

        <span>
          <span className="opacity-90">...or </span>
          <Link to="../registration" className="text-primary font-medium opacity-90 hover:opacity-100">
            create a new account
          </Link>
        </span>
      </div>

      <div className="mb-8">
        <InputLabel
          description="Email"
          control={
            <Input
              name="email"
              value={f.values.email}
              onChange={f.handleChange}
              type="text"
              placeholder="Email"
              autoComplete="email"
            />
          }
          fluid
        />

        <InputLabel
          description="Password"
          control={
            <Input
              name="password"
              value={f.values.password}
              onChange={f.handleChange}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          }
          fluid
        />
      </div>

      <Button primary type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  )
}
