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
  token: z.string(),
});

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8, "Password should be atleast 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password is required"),
});

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});
