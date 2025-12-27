import styles from './page.module.css'

export default function SettingsPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Ayarlar</h2>
        <button className={styles.closeButton}>✕</button>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Tema</h3>
        <div className={styles.themeButtons}>
          <button className={`${styles.themeButton} ${styles.active}`}>
            <span className={styles.themeIcon}>☀️</span>
            <span>Açık</span>
          </button>
          <button className={styles.themeButton}>
            <span className={styles.themeIcon}>🌙</span>
            <span>Koyu</span>
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Dil</h3>
        <div className={styles.languageButtons}>
          <button className={`${styles.languageButton} ${styles.active}`}>
            🇹🇷 Türkçe
          </button>
          <button className={styles.languageButton}>
            🇺🇸 English
          </button>
        </div>
      </div>

      <div className={styles.panelFooter}>
        <button className={styles.closeMainButton}>
          Kapat
        </button>
      </div>
    </div>
  )
}
