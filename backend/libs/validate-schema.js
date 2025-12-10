import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name should contain atleast 3 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password is required"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password is required"),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Token is required"),
});
