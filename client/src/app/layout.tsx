import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import "@/tokens/tokens.css";

export const metadata: Metadata = {
  title: "KanjoLab - Dental Lab Sipariş Yönetimi",
  description:
    "Diş hekimleri ve laboratuvar teknisyenleri için sipariş yönetim platformu",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="tr">
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
