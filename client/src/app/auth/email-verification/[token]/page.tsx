"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { MailIconeeee, CheckCircleIcon, XCircleIcon } from '@/components/ui/Icons';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import { useParams, useRouter } from 'next/navigation';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isProgressActive, setIsProgressActive] = useState(false);
  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const token = useParams()?.token as string;
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      toast.error('Geçersiz doğrulama bağlantısı');
      router.push('/');
    }
  }, [token, router]);


  const handleVerify = async () => {
    if (!token) return;

    setIsLoading(true);
    setVerificationStatus('idle');
    setIsProgressActive(false);

    try {
      await authService.emailVerify(token);

      setIsProgressActive(true);
      setTimeout(() => {
        setVerificationStatus('success');
        setIsLoading(false);
        setVerificationCompleted(true); // Doğrulama tamamlandı
      }, 500);

    } catch (error: any) {
      console.error('Email verification failed', error);

      setIsProgressActive(true);
      setTimeout(() => {
        setVerificationStatus('error');
        setIsLoading(false);
        toast.error(error.message || 'Doğrulama başarısız oldu');
      }, 500);
    }
  };



  const handleResendEmail = async () => {
    router.push('/');
  };
  const handleLoginRedirect = () => {
    router.push('/auth/login');
  };
  const showFeedback = isLoading || verificationStatus !== 'idle';

  return (
    <main className={styles.container}>
      <div className={styles.card}>

        <div className={`${styles.feedbackContainerBase} ${showFeedback ? styles.feedbackContainerOpen : styles.feedbackContainerClosed}`}>
          {isLoading && (
            <div className={styles.progressWrapper}>
              <div dir="rtl" className={styles.progressBarTrack}>
                <div
                  className={`${styles.progressBarFill} ${isProgressActive ? styles.progressBarActive : styles.progressBarInactive}`}
                />
              </div>
            </div>
          )}
          {verificationStatus === 'success' && (
            <div className={styles.successBanner}>
              <CheckCircleIcon className={styles.bannerIcon} />
              <span className={styles.successText}>E-posta başarıyla doğrulandı!</span>
            </div>
          )}
          {verificationStatus === 'error' && (
            <div className={styles.errorBanner}>
              <XCircleIcon className={styles.bannerIcon} />
              <span className={styles.errorText}>Doğrulama başarısız oldu.</span>
            </div>
          )}
        </div>

        <div className={styles.iconContainer}>
          <div className={styles.iconBackground}>
            <MailIconeeee className={styles.mailIcon} />
          </div>
        </div>
        <h1 className={styles.title}>
          {verificationCompleted ? 'Doğrulama Tamamlandı!' : 'E-postanızı Doğrulayın'}
        </h1>


        <p className={styles.description}>
          {verificationCompleted
            ? 'E-posta adresiniz başarıyla doğrulandı. Hesabınıza giriş yapabilirsiniz.'
            : 'Hesabınızı doğrulamak için e-postanıza gönderilen doğrulama bağlantısına tıklayın.'
          }
        </p>   {!verificationCompleted ? (
          <>
            <button
              onClick={handleVerify}
              disabled={isLoading}
              className={styles.verifyButton}
            >
              {isLoading ? 'Doğrulanıyor...' : 'Doğrula'}
            </button>

            <div className={styles.resendContainer}>
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className={styles.resendButton}
                aria-label="Resend verification email"
              >
                E-postayı Yeniden Gönder
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={handleLoginRedirect}
            className={styles.loginButton}
          >
            Giriş Yap
          </button>
        )}
      </div>
    </main>
  );
};

export default App;

