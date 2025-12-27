import React from 'react';
import { SettingsIcon, BarChartIcon, LockIcon } from '../ui/Icons';
import styles from './Features.module.css';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className={styles.featureCard}>
    <div className={styles.featureIconContainer}>
      {icon}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Features: React.FC = () => {
  const featuresData = [
    {
      icon: <SettingsIcon />,
      title: 'Kolay Yönetim',
      description: 'Tüm görevlerinizi tek bir yerden kolayca yönetin ve takip edin.',
    },
    {
      icon: <BarChartIcon />,
      title: 'Detaylı Raporlar',
      description: 'Performansınızı anlamak için kapsamlı ve anlaşılır raporlar alın.',
    },
    {
      icon: <LockIcon />,
      title: 'Güvenli Entegrasyon',
      description: 'Mevcut araçlarınızla sorunsuz bir şekilde entegre olun.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <h2>
            Uygulamamızın Temel Özellikleri
          </h2>
          <p>
            İş akışınızı nasıl kolaylaştırdığımızı ve verimliliğinizi nasıl artırdığımızı keşfedin.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
