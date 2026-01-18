import z, { email } from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password : z.string().min(6, "Password is required")
})

export const signUpSchema = z.object({
    name: z.string().min(3, "Name should contain atleast 3 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must contain minimum 8 characters"),
    confirmPassword: z.string().min(8, "Password must contain minimum 8 characters")
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address")
})

export const resetPasswordRequestSchema = z.object({
    newPassword: z.string().min(8, "Password should be atleast 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match", })