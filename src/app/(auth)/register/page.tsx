"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { formResolver } from "@/lib/validations/resolver";
import { registerSchema, RegisterFormValues } from "@/lib/validations/auth";
import { authApi } from "@/lib/api";
import { getErrorMessage } from "@/lib/api/errors";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { APP_NAME } from "@/lib/constants";
import { Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ROLE_OPTIONS = [
  { value: "ADMIN", label: "Administrator" },
  { value: "RECRUIT_LEAD", label: "Recruitment Lead" },
  { value: "RECRUITER", label: "Recruiter" },
  { value: "HIRING_MANAGER", label: "Hiring Manager" },
  { value: "CANDIDATE", label: "Candidate" },
  { value: "VENDOR", label: "Vendor" },
  { value: "PARTNER", label: "Partner" },
];

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>({
    resolver: formResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...registrationData } = values;

      await authApi.register(registrationData);

      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
            <Briefcase className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{APP_NAME}</h1>
          <p className="mt-2 text-sm text-gray-600">Create your account</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name */}
            <Input
              label="First name"
              type="text"
              placeholder="John"
              error={errors.firstName?.message}
              {...register("firstName")}
            />

            {/* Last Name */}
            <Input
              label="Last name"
              type="text"
              placeholder="Doe"
              error={errors.lastName?.message}
              {...register("lastName")}
            />

            {/* Email */}
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Role */}
            <Select
              label="Role"
              placeholder="Select a role..."
              options={ROLE_OPTIONS}
              error={errors.role?.message}
              {...register("role")}
            />

            {/* Phone (Optional) */}
            <Input
              label="Phone (optional)"
              type="tel"
              placeholder="+1 (555) 000-0000"
              error={errors.phone?.message}
              {...register("phone")}
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter a strong password (min. 8 characters)"
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Confirm Password */}
            <Input
              label="Confirm password"
              type="password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Create account
            </Button>

            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
