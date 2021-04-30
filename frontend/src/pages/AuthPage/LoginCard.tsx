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
    <form className="px-8 py-12 shadow-md rounded" onSubmit={handleSubmit}>
      <h1>Login</h1>

      <InputLabel
        description="Email"
        control={
          <Input
            className="p-1 border-solid shadow"
            name="email"
            value={values.email}
            onChange={handleChange}
            type="text"
            placeholder="Email"
          />
        }
        fluid
      />

      <InputLabel
        description="Password"
        control={
          <Input
            className="p-1 border-solid shadow"
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

const Container = styled.form`
  min-width: 25rem;

  padding: 3rem 2rem 4rem;
  display: flex;
  flex-direction: column;

  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07), 0 3px 6px rgba(0, 0, 0, 0.15);
  border-radius: 0.2rem;
`
