// app/not-found.tsx
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './NotFound.module.css';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı - 404',
  description: 'Aradığınız sayfa mevcut değil.',
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 404 Başlığı */}
        <div className={styles.header}>
          <div className={styles.numberContainer}>
            <h1 className={styles.number}>404</h1>
            <div className={styles.glow}></div>
          </div>
        </div>

        {/* Ana İçerik */}
        <div className={styles.card}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Sayfa Bulunamadı</h2>
            <p className={styles.description}>
              Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
            </p>
            <p className={styles.subDescription}>
              URLyi kontrol edin veya aşağıdaki butonlardan birini deneyin.
            </p>

            {/* Butonlar */}
            <div className={styles.buttonGroup}>
              <Link href="/" className={styles.primaryButton}>
                <HomeIcon className={styles.icon} />
                Ana Sayfaya Dön
              </Link>

              <button
                onClick={() => window.history.back()}
                className={styles.secondaryButton}
              >
                <ArrowLeftIcon className={styles.icon} />
                Geri Dön
              </button>
            </div>

            {/* Hızlı Linkler */}
            <div className={styles.quickLinks}>
              <p className={styles.quickLinksTitle}>Hızlı Erişim</p>
              <div className={styles.links}>
                <Link href="/blog" className={styles.link}>
                  Blog
                </Link>
                <Link href="/hakkimizda" className={styles.link}>
                  Hakkımızda
                </Link>
                <Link href="/iletisim" className={styles.link}>
                  İletişim
                </Link>
                <Link href="/hizmetler" className={styles.link}>
                  Hizmetler
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Arkaplan Dekorasyonları */}
      <div className={styles.backgroundElement1}></div>
      <div className={styles.backgroundElement2}></div>
      <div className={styles.backgroundElement3}></div>
    </div>
  );
}

// İkon Component'leri
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}
