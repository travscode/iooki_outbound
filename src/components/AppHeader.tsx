"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";

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

export default function AppHeader() {
  const pathname = usePathname() || "/";

  const isVoiceActive = pathname === "/";
  const isSmsActive = pathname === "/sms" || pathname.startsWith("/sms/");

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

          <a
            href="https://meetings-ap1.hubspot.com/katie-mcrae"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Request Info
          </a>
        </div>

        <nav className="flex flex-1 flex-wrap items-center justify-center gap-2 sm:gap-3">
          <NavLink href="/" label="Voice Demo" isActive={isVoiceActive} />
          <NavLink href="/sms" label="SMS Demo" isActive={isSmsActive} />
        </nav>

        <a
          href="https://meetings-ap1.hubspot.com/katie-mcrae"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Request Info
        </a>
      </div>
    </header>
  );
}
