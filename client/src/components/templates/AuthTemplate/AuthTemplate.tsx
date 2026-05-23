"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthModal } from "@/components/organisms/AuthModal";
import { Header } from "@/components/organisms/Header";
import styles from "./AuthTemplate.module.css";

export function AuthTemplate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.page}>
      <Header onLoginClick={() => setIsModalOpen(true)} />
      <main className={styles.hero}>
        <h1 className={styles.brand}>KanjoLab</h1>
        <p className={styles.tagline}>
          Manage your dental prosthesis orders digitally.
          The platform connecting dentists and lab technicians.
        </p>
      </main>
      <AuthModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={() => router.push("/dashboard")}
      />
    </div>
  );
}

AuthTemplate.displayName = "AuthTemplate";
export default AuthTemplate;
