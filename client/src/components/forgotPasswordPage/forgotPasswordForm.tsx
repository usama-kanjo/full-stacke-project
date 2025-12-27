import React, { useState } from 'react';
import { BrandIcon } from '../ui/Icons';
import styles from './forgotPasswordForm.module.css';
import Link from 'next/link';

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would handle the API call here.
    console.log('Password reset requested for:', email);
    setSubmitted(true);
  };

  return (
    <div className={styles.forgotPasswordForm}>
      <div className={styles.formContainer}>
        <div className={styles.logoContainer}>
          <BrandIcon className={styles.brandIcon} />
          <span className={styles.brandLogoText}>BrandLogo</span>
        </div>

        <h1 className={styles.formTitle}>Şifreni Sıfırla</h1>
        <p className={styles.formDescription}>
          Şifre sıfırlama bağlantısı göndermek için kayıtlı e-posta adresinizi girin.
        </p>

        {submitted ? (
          <div className={styles.submittedMessage} role="alert">
            <p className={styles.submittedMessageTitle}>Bağlantı Gönderildi</p>
            <p>Eğer {email} adresi sistemimizde kayıtlıysa, şifre sıfırlama bağlantısı gönderilmiştir.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.passwordResetForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                E-posta Adresiniz
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresinizi girin"
                required
                className={styles.formInput}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
            >
              Sıfırlama Bağlantısı Gönder
            </button>
          </form>
        )}

        <Link
          href="/auth/login"
          className={styles.backLink}
        >
          Giriş Ekranına Geri Dön
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
