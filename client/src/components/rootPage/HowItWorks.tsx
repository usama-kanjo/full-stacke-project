import React from 'react';
import styles from './HowItWorks.module.css';

interface StepProps {
  number: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => (
  <div className={styles.step}>
    <div className={styles.stepNumber}>
      {number}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className={styles.howItWorks}>
      <div className="container">
        <div className={styles.howItWorksHeader}>
          <h2>
            Nasıl Çalışır?
          </h2>
          <p>
            Sadece 3 basit adımda uygulamamızı kullanmaya başlayın ve verimliliğinizi artırın.
          </p>
        </div>
        <div className={styles.howItWorksStepsContainer}>
          <div className={styles.stepsConnector}></div>
          <div className={styles.stepsGrid}>
            <Step
              number="1"
              title="Hesap Oluşturun"
              description="Birkaç saniye içinde ücretsiz bir hesap oluşturarak başlayın."
            />
            <Step
              number="2"
              title="Verilerinizi Ekleyin"
              description="Projelerinizi, görevlerinizi veya diğer bilgilerinizi sisteme kolayca yükleyin."
            />
            <Step
              number="3"
              title="Keyfini Çıkarın"
              description="İş akışınızın nasıl kolaylaştığını ve verimliliğinizin arttığını izleyin."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
