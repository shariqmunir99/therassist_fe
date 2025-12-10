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

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  userType: z.enum(["Therapist", "Client"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginTherapist, sendClientOTP } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      userType: "Therapist",
    },
  });

  const userType = watch("userType");

  const onSubmit = async (data: LoginFormValues) => {
    // Trigger validation for all fields
    const isValid = await trigger();

    if (!isValid) {
      return;
    }

    if (data.userType === "Therapist") {
      // Therapist login with email and password
      loginTherapist.mutate({
        email: data.email,
        password: data.password,
      });
    } else {
      // Client login - send OTP to email
      sendClientOTP.mutate({
        email: data.email,
      });
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white">
      <div className="flex flex-col items-center justify-start p-6 pt-8 md:pt-12">
        <Logo className="mb-3 md:mb-4" />

        <h1 className="text-[#1D1D1F] tracking-tight text-[28px] md:text-[32px] font-bold leading-tight text-center pb-2 pt-3 md:pt-4">
          Welcome to Therassist
        </h1>
        <p className="text-[#8E8E93] text-base font-normal leading-normal pb-6 md:pb-8 text-center">
          Your Partner in Mental Wellness.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md md:max-w-2xl shadow-lg rounded-2xl bg-white p-4 md:p-6"
        >
          <Controller
            control={control}
            name="userType"
            render={({ field }) => (
              <UserTypeToggle
                value={field.value}
                onChange={field.onChange}
                className="max-w-full"
              />
            )}
          />

          <FieldGroup className="w-full px-4 py-2 md:py-3">
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

            {userType === "Therapist" && (
              <>
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
                        rightIcon={
                          showPassword ? "visibility_off" : "visibility"
                        }
                        onRightIconClick={() => setShowPassword(!showPassword)}
                        placeholder="Enter your password"
                        {...field}
                      />
                    )}
                  />
                  <FieldError errors={[errors.password]} />
                </Field>

                <div className="flex justify-end -mt-2">
                  <Link
                    href="/forgot-password"
                    className="text-[#005A9C] text-sm font-medium hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </>
            )}
          </FieldGroup>

          <div className="w-full px-4 pt-4 md:pt-6 space-y-3 md:space-y-4">
            <Button
              type="submit"
              disabled={loginTherapist.isPending || sendClientOTP.isPending}
              className="flex items-center justify-center w-full h-12 md:h-14 rounded-xl bg-[#005A9C] cursor-pointer text-white text-base font-bold leading-normal shadow-sm hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginTherapist.isPending || sendClientOTP.isPending
                ? "Loading..."
                : userType === "Client"
                ? "Continue"
                : "Log In"}
            </Button>

            {sendClientOTP.isSuccess && (
              <p className="text-sm text-green-600 text-center">
                OTP sent to your email. Please check your inbox.
              </p>
            )}

            {userType === "Therapist" && (
              <p className="text-center text-sm text-[#8E8E93] mt-6 md:mt-8">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#005A9C] font-medium hover:underline"
                >
                  Create a new one
                </Link>
              </p>
            )}
          </div>
          {userType === "Therapist" && (
            <>
              <div className="flex items-center w-full max-w-md md:max-w-2xl px-4 py-6 md:py-8">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="px-4 text-sm text-[#8E8E93]">or</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div className="w-full max-w-md md:max-w-2xl px-4 space-y-3 md:space-y-4">
                <SocialButton provider="google">
                  Continue with Google
                </SocialButton>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
