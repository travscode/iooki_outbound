import { NextResponse } from "next/server";
import { getSiteAuthCookieOptions, SITE_AUTH_COOKIE_NAME } from "@/utils/siteAuth";

/**
 * Clears the site auth cookie and ends the current password session.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: SITE_AUTH_COOKIE_NAME,
    value: "",
    ...getSiteAuthCookieOptions(),
    maxAge: 0,
  });

  return response;
}
