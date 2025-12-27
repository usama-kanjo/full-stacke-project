'use client'
// import styles from './home.module.css';
import Header from '@/components/Header/header';
import Hero from '@/components/rootPage/Hero';
import Features from '@/components/rootPage/Features';
import Trust from '@/components/rootPage/Trust';
import HowItWorks from '@/components/rootPage/HowItWorks';
import CTA from '@/components/rootPage/CTA';
import Footer from '@/components/Footer/footer';


export default function Home() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <Features />
        <Trust />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
