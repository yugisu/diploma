import * as z from 'zod'

export const UserRegistrationModel = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(64),
    passwordConfirmation: z.string(),
    name: z.string().nonempty(),
  })
  .refine(
    ({ password, passwordConfirmation }) => passwordConfirmation === undefined || password === passwordConfirmation,
    {
      message: "Passwords don't match",
      path: ['passwordConfirmation'],
    },
  )

export const UserLoginModel = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
})
