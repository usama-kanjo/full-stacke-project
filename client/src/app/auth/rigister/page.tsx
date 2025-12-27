"use client";
import React from 'react';
import SignUpForm from '@/components/rigisterPage/rigister';
import styles from './page.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <SignUpForm />
    </div>
  );
};

export default App;

