"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Logo } from "@/modules/shared/components/Logo";
import { UserTypeToggle } from "@/modules/shared/components/ui/UserTypeToggle";
import { FormInput } from "@/modules/shared/components/ui/FormInput";
import { SocialButton } from "@/modules/shared/components/ui/SocialButton";
import { useAuth } from "@/hooks/useAuth";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[^0-9]*$/, { message: "First name cannot contain numbers" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be less than 50 characters" })
      .regex(/^[^0-9]*$/, { message: "Last name cannot contain numbers" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signupTherapist } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    // Trigger validation for all fields
    const isValid = await trigger();

    if (!isValid) {
      return;
    }

    signupTherapist.mutate({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white">
      <div className="flex flex-col items-center justify-start p-6 pt-8 md:pt-12">
        <Logo className="mb-3 md:mb-4" />

        <h1 className="text-[#1D1D1F] tracking-tight text-[28px] md:text-[32px] font-bold leading-tight text-center pb-2 pt-3 md:pt-4">
          Create Your Account
        </h1>
        <p className="text-[#8E8E93] text-base font-normal leading-normal pb-6 md:pb-8 text-center">
          Join Therassist and start your wellness journey.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md md:max-w-2xl shadow-lg rounded-2xl bg-white p-4 md:p-6"
        >
          <FieldGroup className="w-full px-4 py-2 md:py-3">
            <div className="flex flex-col md:flex-row md:gap-4">
              <Field className="flex-1">
                <FieldLabel className="text-[#1D1D1F] text-base font-medium leading-normal">
                  First Name
                </FieldLabel>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormInput
                      leftIcon="person"
                      placeholder="Enter your first name"
                      {...field}
                    />
                  )}
                />
                <FieldError errors={[errors.firstName]} />
              </Field>

              <Field className="flex-1">
                <FieldLabel className="text-[#1D1D1F] text-base font-medium leading-normal">
                  Last Name
                </FieldLabel>
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormInput
                      leftIcon="person"
                      placeholder="Enter your last name"
                      {...field}
                    />
                  )}
                />
                <FieldError errors={[errors.lastName]} />
              </Field>
            </div>

            <Field>
              <FieldLabel className="text-[#1D1D1F] text-base font-medium leading-normal">
                Email
              </FieldLabel>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormInput
                    type="email"
                    leftIcon="mail"
                    placeholder="Enter your email"
                    {...field}
                  />
                )}
              />
              <FieldError errors={[errors.email]} />
            </Field>

            <Field>
              <FieldLabel className="text-[#1D1D1F] text-base font-medium leading-normal">
                Password
              </FieldLabel>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <FormInput
                    type={showPassword ? "text" : "password"}
                    leftIcon="lock"
                    rightIcon={showPassword ? "visibility_off" : "visibility"}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                    placeholder="Enter your password"
                    {...field}
                  />
                )}
              />
              <FieldError errors={[errors.password]} />
            </Field>

            <Field>
              <FieldLabel className="text-[#1D1D1F] text-base font-medium leading-normal">
                Confirm Password
              </FieldLabel>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormInput
                    type={showConfirmPassword ? "text" : "password"}
                    leftIcon="lock"
                    rightIcon={
                      showConfirmPassword ? "visibility_off" : "visibility"
                    }
                    onRightIconClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    placeholder="Confirm your password"
                    {...field}
                  />
                )}
              />
              <FieldError errors={[errors.confirmPassword]} />
            </Field>
          </FieldGroup>

          <div className="w-full px-4 pt-4 md:pt-6 space-y-3 md:space-y-4">
            <Button
              type="submit"
              disabled={signupTherapist.isPending}
              className="flex items-center justify-center cursor-pointer w-full h-12 md:h-14 rounded-xl bg-[#005A9C] text-white text-base font-bold leading-normal shadow-sm hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signupTherapist.isPending
                ? "Creating Account..."
                : "Create Account"}
            </Button>
          </div>
        </form>

        <div className="flex items-center w-full max-w-md md:max-w-2xl px-4 py-6 md:py-8">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-4 text-sm text-[#8E8E93]">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        <div className="w-full max-w-md md:max-w-2xl px-4 space-y-3 md:space-y-4">
          <SocialButton provider="google">Continue with Google</SocialButton>
        </div>

        <p className="text-center text-sm text-[#8E8E93] mt-6 md:mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#005A9C] font-medium hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
