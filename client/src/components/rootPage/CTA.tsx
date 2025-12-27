import React from 'react';
import styles from './CTA.module.css';

const CTA: React.FC = () => {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaBox}>
          <h2>
            Hazır mısınız?
          </h2>
          <p>
            Hemen bugün ekibimize katılın ve işlerinizi bir üst seviyeye taşıyın.
          </p>
          <div className={styles.ctaButtonContainer}>
            <a href="#" className={styles.ctaButton}>
              Demoyu İncele
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
