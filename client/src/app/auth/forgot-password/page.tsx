"use client";
import React from 'react';
import ForgotPasswordForm from '@/components/forgotPasswordPage/forgotPasswordForm';
import styles from './page.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.appMain}>
      <ForgotPasswordForm />
    </div>
  );
};

export default App;
