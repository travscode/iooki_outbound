"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/utils/utils";

/**
 * Renders a single navigation link in the site header.
 */
function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
      )}
    >
      {label}
    </Link>
  );
}

/**
 * Renders the main app header and allows the active session to be locked again.
 */
export default function AppHeader() {
  const pathname = usePathname() || "/";
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isVoiceActive = pathname === "/";
  const isSmsActive = pathname === "/sms" || pathname.startsWith("/sms/");

  /**
   * Clears the auth cookie and reloads the app into the locked state.
   */
  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } finally {
      window.location.reload();
    }
  }

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center">
            <img
              src="https://yabbr.com.au/assets/yabbr-logo-blue.91a6ee06af1b.png"
              alt="Yabbr"
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex items-center gap-2 sm:hidden">
            <a
              href="https://meetings-ap1.hubspot.com/katie-mcrae"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Request Info
            </a>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Locking..." : "Lock Demo"}
            </button>
          </div>
        </div>

        <nav className="flex flex-1 flex-wrap items-center justify-center gap-2 sm:gap-3">
          <NavLink href="/" label="Voice Demo" isActive={isVoiceActive} />
          <NavLink href="/sms" label="SMS Demo" isActive={isSmsActive} />
        </nav>

        <div className="hidden sm:flex sm:items-center sm:gap-3">
          <a
            href="https://meetings-ap1.hubspot.com/katie-mcrae"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Request Info
          </a>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingOut ? "Locking..." : "Lock Demo"}
          </button>
        </div>
      </div>
    </header>
  );
}
