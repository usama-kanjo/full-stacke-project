import React, { useState } from 'react';
import Link from 'next/link'
import styles from './header.module.css';

const Logo: React.FC = () => (
  <div className={styles.logo}>
    <div className={styles.logoIconWrapper}>
      <div className={styles.logoIcon}></div>
    </div>
    <span className={styles.logoText}>Uygulama Logosu</span>
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Özellikler', href: '#' },
    { name: 'Fiyatlandırma', href: '#' },
    { name: 'Hakkımızda', href: '#' },
    { name: 'İletişim', href: '#' },
  ];

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Logo />
          <nav className={styles.nav}>
            <div className={styles.navLinks}>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}>
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
          <div className={styles.headerActions}>
            <div className={styles.headerActionsLinks}>
              <Link href="/auth/login" className={styles.loginBtn}>Giriş Yap</Link>
              <Link href="/auth/rigister" className={styles.signupBtn}>Kayıt Ol</Link>
            </div>
          </div>
          <div className={styles.mobileMenuContainer}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={styles.mobileMenuButton}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileNavLinks}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </a>
          ))}
        </div>
        <div className={styles.mobileActions}>
          <Link href="/auth/login" className={styles.loginBtn}>Giriş Yap</Link>
          <Link href="/auth/rigister" className={styles.signupBtn}>Kayıt Ol</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
