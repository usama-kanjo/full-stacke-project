import React from 'react';
import styles from './Trust.module.css';

const Trust: React.FC = () => {
  return (
    <section className={styles.trust}>
      <div className="container">
        <h2>
          Bize Güvenenler
        </h2>
        <div className={styles.trustLogos}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.trustLogoPlaceholder}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
