import { cookies } from "next/headers";

export interface User {
  id: string;
  email: string;
  role: "therapist" | "client";
  name?: string;
  first_name?: string;
  last_name?: string;
}

/**
 * Decode JWT token payload without verification
 * We don't verify here - the backend will reject invalid tokens with 401/403
 */
function decodeJWT(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

/**
 * Get current authenticated user from JWT token in cookies
 * This works in server components (App Router)
 *
 * Note: We only decode the token to read user info.
 * We do NOT verify the token - that's the backend's job.
 * If the token is invalid/expired, any backend API call will return 401/403
 * and the axios interceptor will redirect to login.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return null;
    }

    // Decode the token to get user info (without verification)
    const payload = decodeJWT(accessToken);

    if (!payload) {
      return null;
    }

    // Extract user info from token payload
    // Adjust field names based on your backend's JWT structure
    return {
      id: payload.sub || payload.id || payload.user_id || payload.userId,
      email: payload.email,
      role: payload.role
        ? payload.role?.toLowerCase() === "therapist"
          ? "therapist"
          : "client"
        : "therapist",
      name:
        payload.first_name && payload.last_name
          ? `${payload.first_name} ${payload.last_name}`
          : payload.name || payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

/**
 * Require specific role - throws if user doesn't have required role
 */
export async function requireRole(allowedRoles: string[]): Promise<User> {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    throw new Error("Forbidden - Insufficient permissions");
  }

  return user;
}
