import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'

import { authService } from 'services/authService'

import { InputLabel } from 'components/Common/InputLabel'
import { Input } from 'components/Common/Input'

export const LoginCard = () => {
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (valuesToSubmit, { setSubmitting }) => {
      await authService.login(valuesToSubmit)

      setSubmitting(false)
    },
  })

  return (
    <form className="px-10 py-20 shadow-lg rounded border border-gray-400 border-opacity-20" onSubmit={handleSubmit}>
      <h1 className="text-4xl">Login</h1>

      <InputLabel
        description="Email"
        control={<Input name="email" value={values.email} onChange={handleChange} type="text" placeholder="Email" />}
        fluid
      />

      <InputLabel
        description="Password"
        control={
          <Input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />
        }
        marginBottom="1rem"
        fluid
      />

      <button type="submit">Submit</button>

      <Link to="../registration" style={{ alignSelf: 'center' }}>
        Create account
      </Link>
    </form>
  )
}
