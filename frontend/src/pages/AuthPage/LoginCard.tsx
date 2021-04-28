import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'

import { authService } from 'services/authService'

import { Input } from 'components/Common/Input'
import { Label } from 'components/Common/Label'

export const LoginCard = () => {
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (valuesToSubmit, { setSubmitting }) => {
      await authService.login(valuesToSubmit)

      setSubmitting(false)
    },
  })

  return (
    <Container onSubmit={handleSubmit}>
      <h1>Login</h1>

      <Label
        description="Email"
        control={
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            type="text"
            placeholder="Email"
            fluid
            autoFocus
          />
        }
      />

      <Label
        description="Password"
        control={
          <Input
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            fluid
          />
        }
        marginBottom="1rem"
      />

      <button type="submit">Submit</button>

      <Link to="../registration" style={{ alignSelf: 'center' }}>
        Create account
      </Link>
    </Container>
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
