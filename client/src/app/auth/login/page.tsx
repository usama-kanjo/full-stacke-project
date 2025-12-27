'use client'

import React from 'react';
import LoginForm from '@/components/LoginPage/LoginForm';
import styles from './page.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>
        <LoginForm />
      </main>
      {/* Fix: Replaced footer tag with div to resolve "Cannot find name 'footer'" error */}
      <div className={styles.appFooter}>
        <p>© 2024 Şirket Adı. Tüm hakları saklıdır.</p>
      </div>
    </div>
  );
};

export default App;

