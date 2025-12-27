import React from 'react';
import styles from './footer.module.css';

const Logo: React.FC = () => (
  <div className={styles.logo}>
    <div className={styles.logoIconWrapper}>
      <div className={styles.logoIcon}></div>
    </div>
    <span className={styles.logoText}>Uygulama</span>
  </div>
);

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <a href={href}>
      {children}
    </a>
  </li>
);

const Footer: React.FC = () => {
  const footerLinks = {
    'ÜRÜN': [
      { name: 'Özellikler', href: '#' },
      { name: 'Fiyatlandırma', href: '#' },
      { name: 'Entegrasyonlar', href: '#' },
    ],
    'ŞİRKET': [
      { name: 'Hakkımızda', href: '#' },
      { name: 'Kariyer', href: '#' },
      { name: 'İletişim', href: '#' },
    ],
    'KAYNAKLAR': [
      { name: 'Blog', href: '#' },
      { name: 'Yardım Merkezi', href: '#' },
      { name: 'SSS', href: '#' },
    ],
    'YASAL': [
      { name: 'Gizlilik Politikası', href: '#' },
      { name: 'Kullanım Koşulları', href: '#' },
    ],
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.footerGrid}>
          <div className={styles.footerAbout}>
            <Logo />
            <p>
              © 2024 Uygulama A.Ş. Tüm hakları saklıdır.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className={styles.footerLinksColumn}>
              <h3>{title}</h3>
              <ul className={styles.footerLinks}>
                {links.map((link) => (
                  <FooterLink key={link.name} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
