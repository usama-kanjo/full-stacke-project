'use client';
import React, { useState } from 'react';
import styles from './DashboardClient.module.css';
import Header from './Header/header';
import Sidebar from './Sidebar/sidebar';

interface DashboardClientProps {
  children: React.ReactNode;
}

export default function DashboardClient({ children }: DashboardClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.appContainer}>
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={styles.mainLayout}>
        <Sidebar isOpen={isSidebarOpen} />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
