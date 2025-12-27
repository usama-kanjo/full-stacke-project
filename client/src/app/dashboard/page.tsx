import styles from './page.module.css'
import "./globals.css";

export default function DashboardPage() {
  return (
    <div>
      <h1 className={styles.title}>Dashboarda Hoşgeldiniz</h1>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Toplam Kullanıcı</h3>
          <p className={styles.cardValue}>1,234</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Aktif Projeler</h3>
          <p className={styles.cardValue}>56</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Gelir</h3>
          <p className={styles.cardValue}>₺45,678</p>
        </div>
      </div>
    </div>
  )
}
