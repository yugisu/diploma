import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { UserRegistrationModel, UserRegistrationModelT } from '@diploma/shared'

import { authService } from 'services/authService'

import { InputLabel } from 'components/Common/InputLabel'
import { Input } from 'components/Common/Input'
import { Button } from 'components/Common/Button'

export const RegistrationView = () => {
  const navigate = useNavigate()

  const f = useFormik<UserRegistrationModelT>({
    initialValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    },
    validateOnChange: true,
    validate: (values) => {
      const parseResult = UserRegistrationModel.safeParse(values)

      if (!parseResult.success) {
        return parseResult.error.flatten().fieldErrors
      }
    },
    onSubmit: async (valuesToSubmit, { setSubmitting }) => {
      await authService.createAccount(valuesToSubmit)

      navigate('/auth/registration-success')

      setSubmitting(false)
    },
  })

  return (
    <form className="max-w-md w-full" onSubmit={f.handleSubmit}>
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-7xl mb-3 opacity-80">Sign up</h1>

        <span>
          <span className="opacity-90">...or </span>
          <Link to="../login" className="text-primary font-medium opacity-90 hover:opacity-100">
            use an existing account
          </Link>
        </span>
      </div>

      <div className="mb-8">
        <InputLabel
          description="Name"
          control={
            <Input
              name="name"
              value={f.values.name}
              hasError={Boolean(f.errors.name)}
              onChange={f.handleChange}
              type="text"
              placeholder="Your name"
              autoComplete="name"
            />
          }
          required
          error={f.errors.name}
          fluid
        />

        <InputLabel
          description="Email"
          control={
            <Input
              name="email"
              value={f.values.email}
              hasError={Boolean(f.errors.email)}
              onChange={f.handleChange}
              type="text"
              placeholder="Email"
              autoComplete="email"
            />
          }
          required
          error={f.errors.email}
          fluid
        />

        <InputLabel
          description="Password"
          control={
            <Input
              name="password"
              value={f.values.password}
              hasError={Boolean(f.errors.password)}
              onChange={f.handleChange}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          }
          required
          error={f.errors.password}
          fluid
        />

        <InputLabel
          description="Confirm password"
          control={
            <Input
              name="passwordConfirmation"
              value={f.values.passwordConfirmation}
              hasError={Boolean(f.errors.passwordConfirmation)}
              onChange={f.handleChange}
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
            />
          }
          required
          error={f.errors.passwordConfirmation}
          fluid
        />
      </div>

      <Button primary type="submit" className="w-full" disabled={f.isSubmitting}>
        Create new account
      </Button>
    </form>
  )
}
