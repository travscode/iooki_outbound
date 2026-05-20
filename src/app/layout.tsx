import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppHeader from "@/components/AppHeader";
import PasswordGate from "@/components/PasswordGate";
import "./globals.css";
import { getIsSiteAuthenticated } from "@/utils/siteAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outbound Demo",
  description: "This is an outbound call agent demo.",
};

/**
 * Wraps the entire app and blocks access until the password gate is unlocked.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await getIsSiteAuthenticated();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        {isAuthenticated ? (
          <>
            <AppHeader />
            <div className="flex flex-1 flex-col">{children}</div>
          </>
        ) : (
          <PasswordGate />
        )}
      </body>
    </html>
  );
}
