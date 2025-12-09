/**
 * Authentication Hook
 *
 * React Query mutations for authentication operations
 * Handles token storage and error handling
 */

"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as authApi from "@/lib/auth/api";
import type {
  LoginRequest,
  SignupRequest,
  OTPRequest,
  OTPVerifyRequest,
  AuthResponse,
  OTPResponse,
} from "@/lib/auth/types";
import { AxiosError } from "axios";
import { toast } from "sonner";

/**
 * Store authentication tokens in localStorage
 */
const storeTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

/**
 * Get stored access token
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

/**
 * Get stored refresh token
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

/**
 * Authentication hook with React Query mutations
 */
export const useAuth = () => {
  const router = useRouter();

  /**
   * Therapist login mutation
   */
  const loginTherapistMutation = useMutation<
    AuthResponse,
    AxiosError,
    LoginRequest
  >({
    mutationFn: authApi.loginTherapist,
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Login successful!");
        storeTokens(response.data.access_token, response.data.refresh_token);
        router.push("/dashboard/therapists/clients");
      }
    },
    onError: (error) => {
      if (error.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      }
    },
  });

  /**
   * Client OTP send mutation
   */
  const sendClientOTPMutation = useMutation<OTPResponse, Error, OTPRequest>({
    mutationFn: authApi.sendClientOTP,
    // OTP sent successfully, user should now verify
  });

  /**
   * Client OTP verify mutation
   */
  const verifyClientOTPMutation = useMutation<
    AuthResponse,
    Error,
    OTPVerifyRequest
  >({
    mutationFn: authApi.verifyClientOTP,
    onSuccess: (response) => {
      if (response.data) {
        storeTokens(response.data.access_token, response.data.refresh_token);
        router.push("/dashboard/clients");
      }
    },
  });

  /**
   * Therapist signup mutation
   */
  const signupTherapistMutation = useMutation<
    AuthResponse,
    Error,
    SignupRequest
  >({
    mutationFn: authApi.signupTherapist,
    onSuccess: (response) => {
      if (response.data) {
        toast.success("Signup successful! You are now logged in.");
        storeTokens(response.data.access_token, response.data.refresh_token);
        router.push("/dashboard/therapists/clients");
      }
    },
    onError: (error) => {
      console.log("Shariq Munir");
      toast.error("Signup failed. Please try again.");
    },
  });

  /**
   * Logout mutation
   */
  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: authApi.logout,
    onSuccess: () => {
      router.push("/login");
    },
  });

  return {
    // Mutations
    loginTherapist: loginTherapistMutation,
    sendClientOTP: sendClientOTPMutation,
    verifyClientOTP: verifyClientOTPMutation,
    signupTherapist: signupTherapistMutation,
    logout: logoutMutation,

    // Utility functions
    isAuthenticated,
    getAccessToken,
    getRefreshToken,
  };
};
