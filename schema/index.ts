import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email({
    message: "Invalid email please provide a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be 8 characters or higher",
  }),
});

export type AuthCredentialsValidatorType = z.infer<typeof AuthCredentialsValidator>