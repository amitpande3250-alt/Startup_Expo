import { MotionConfig } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import ScheduleStrip from './components/ScheduleStrip';
import Features from './components/Features';
import Activities from './components/Activities';
import Visit from './components/Visit';
import Agenda from './components/Agenda';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <main className="bg-black min-h-screen">
        <Hero />
        <About />
        <ScheduleStrip />
        <Features />
        <Activities />
        <Visit />
        <Agenda />
        <FAQ />
        <Footer />
      </main>
    </MotionConfig>
  );
}
