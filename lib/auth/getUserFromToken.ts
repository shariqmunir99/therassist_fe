/**
 * Client-side utility to decode JWT token from localStorage
 * and extract user information
 */

interface TokenPayload {
  sub?: string;
  id?: string;
  user_id?: string;
  userId?: string;
  email?: string;
  role?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
}

function decodeJWT(token: string): TokenPayload | null {
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
 * Get current user's name from JWT token in localStorage
 * Returns formatted name or email as fallback
 */
export function getCurrentUserName(): string {
  if (typeof window === "undefined") {
    return "Therapist";
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    return "Therapist";
  }

  const payload = decodeJWT(token);
  if (!payload) {
    return "Therapist";
  }

  // Try to construct full name
  if (payload.first_name && payload.last_name) {
    return `${payload.first_name} ${payload.last_name}`;
  }

  // Fallback to name field or email
  return payload.name || payload.email || "Therapist";
}

/**
 * Get current user's first name from JWT token
 */
export function getCurrentUserFirstName(): string {
  if (typeof window === "undefined") {
    return "Therapist";
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    return "Therapist";
  }

  const payload = decodeJWT(token);
  if (!payload) {
    return "Therapist";
  }

  return payload.first_name || payload.name?.split(" ")[0] || "Therapist";
}
