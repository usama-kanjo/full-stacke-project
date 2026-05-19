import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth in MERN",
  description: "Authentication system built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
