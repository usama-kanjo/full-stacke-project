import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>
              En Büyük Faydayı Vurgulayan Etkili Slogan
            </h1>
            <p>
              Uygulamanın ne yaptığını bir cümleyle açıklayan destekleyici metin.
            </p>
            <div className={styles.heroCtaButton}>
              <a href="#">
                Ücretsiz Başla
              </a>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div className={styles.heroImage}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
