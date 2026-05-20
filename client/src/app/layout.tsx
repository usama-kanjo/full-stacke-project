import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/tokens/tokens.css";

export const metadata: Metadata = {
  title: "Auth in MERN",
  description: "Authentication system built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
