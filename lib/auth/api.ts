/**
 * Authentication API Service
 *
 * Axios-based API calls for Supabase authentication
 * These functions are wrapped by React Query mutations in useAuth hook
 */

import axios from "@/lib/axios";
import type {
  LoginRequest,
  SignupRequest,
  OTPRequest,
  OTPVerifyRequest,
  AuthResponse,
  OTPResponse,
} from "./types";

const THERAPIST_LOGIN_API_URL = "/auth/login";

/**
 * Login therapist with email and password
 */
export const loginTherapist = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    THERAPIST_LOGIN_API_URL,
    credentials
  );
  return response.data;
};

/**
 * Send OTP to client's email for passwordless login
 */
export const sendClientOTP = async (
  request: OTPRequest
): Promise<OTPResponse> => {
  const response = await axios.post<OTPResponse>(
    "/auth/client/send-otp",
    request
  );
  return response.data;
};

/**
 * Verify client's OTP and complete login
 */
export const verifyClientOTP = async (
  request: OTPVerifyRequest
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    "/auth/client/verify-otp",
    request
  );
  return response.data;
};

/**
 * Sign up new therapist
 */
export const signupTherapist = async (
  data: SignupRequest
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/auth/signup", data);
  return response.data;
};

/**
 * Logout user and invalidate tokens
 */
export const logout = async (): Promise<void> => {
  // Clear tokens from localStorage
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_id");

  // Clear cookies
  document.cookie = "access_token=; path=/; max-age=0";
  document.cookie = "refresh_token=; path=/; max-age=0";
  document.cookie = "user_id=; path=/; max-age=0";

  // Optionally call backend logout endpoint to invalidate tokens
  try {
    await axios.post("/auth/logout");
  } catch (error) {
    // Ignore errors on logout
    console.warn("Logout request failed:", error);
  }
};
