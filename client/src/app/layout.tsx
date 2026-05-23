import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import "@/tokens/tokens.css";

export const metadata: Metadata = {
  title: "KanjoLab - Dental Lab Order Management",
  description:
    "Order management platform for dentists and lab technicians",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-sm)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
