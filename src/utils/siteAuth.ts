import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const SITE_AUTH_COOKIE_NAME = "iooki-demo-auth";

const SITE_AUTH_COOKIE_VALUE = "authenticated";
const SITE_AUTH_PASSWORD = "y@bbademo321";

/**
 * Validates the submitted password against the site password.
 */
export function isPasswordValid(password: string) {
  return password === SITE_AUTH_PASSWORD;
}

/**
 * Returns the cookie value used to mark a request as authenticated.
 */
export function getSiteAuthCookieValue() {
  return SITE_AUTH_COOKIE_VALUE;
}

/**
 * Builds the cookie options for the password gate session.
 */
export function getSiteAuthCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}

/**
 * Checks whether the current server-rendered request is already authenticated.
 */
export async function getIsSiteAuthenticated() {
  const cookieStore = await cookies();
  return (
    cookieStore.get(SITE_AUTH_COOKIE_NAME)?.value === SITE_AUTH_COOKIE_VALUE
  );
}

/**
 * Checks whether an incoming route request includes the auth cookie.
 */
export function isAuthenticatedRequest(request: NextRequest) {
  return (
    request.cookies.get(SITE_AUTH_COOKIE_NAME)?.value === SITE_AUTH_COOKIE_VALUE
  );
}
