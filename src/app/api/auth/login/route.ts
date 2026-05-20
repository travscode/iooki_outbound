import { NextResponse } from "next/server";
import {
  getSiteAuthCookieOptions,
  getSiteAuthCookieValue,
  isPasswordValid,
  SITE_AUTH_COOKIE_NAME,
} from "@/utils/siteAuth";

/**
 * Validates the submitted password and starts the site auth session.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    const password = body.password?.trim() ?? "";

    if (!isPasswordValid(password)) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: SITE_AUTH_COOKIE_NAME,
      value: getSiteAuthCookieValue(),
      ...getSiteAuthCookieOptions(),
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
