import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    role: z.enum(
      [
        "ADMIN",
        "RECRUIT_LEAD",
        "RECRUITER",
        "HIRING_MANAGER",
        "CANDIDATE",
        "VENDOR",
        "PARTNER",
      ],
      {
        errorMap: () => ({ message: "Please select a valid role" }),
      },
    ),
    phone: z.string().optional(),
    companyId: z.string().optional(),
    departmentId: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
