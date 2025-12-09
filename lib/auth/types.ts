/**
 * Authentication Types
 * 
 * Type definitions for Supabase authentication system
 */

/**
 * User type discriminator
 */
export type UserType = 'Therapist' | 'Client';

/**
 * Authenticated user data from Supabase
 */
export interface AuthUser {
  id: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  error?: string;
  data?: T;
}

/**
 * Therapist login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Therapist signup request payload
 */
export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: UserType;
}

/**
 * Client OTP request payload (send OTP to email)
 */
export interface OTPRequest {
  email: string;
}

/**
 * Client OTP verification payload
 */
export interface OTPVerifyRequest {
  email: string;
  otp: string;
}

/**
 * Authentication response from Supabase
 */
export type AuthResponse = ApiResponse<AuthUser>;

/**
 * OTP send response
 */
export type OTPResponse = ApiResponse<{ email: string }>;
