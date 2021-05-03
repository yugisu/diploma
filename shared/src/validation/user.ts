import * as z from 'zod'

export const SimpleUserRegistrationModel = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(8).max(64),
})

export type SimpleUserRegistrationModelT = z.infer<typeof SimpleUserRegistrationModel>

export const UserRegistrationModel = SimpleUserRegistrationModel.extend({
  passwordConfirmation: z.string(),
}).refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
  message: "Passwords don't match",
  path: ['passwordConfirmation'],
})

export type UserRegistrationModelT = z.infer<typeof UserRegistrationModel>

export const UserLoginModel = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
})

export type UserLoginModelT = z.infer<typeof UserLoginModel>
