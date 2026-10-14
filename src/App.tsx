import Hero from './components/Hero';
import About from './components/About';
import ScheduleStrip from './components/ScheduleStrip';
import Features from './components/Features';
import Activities from './components/Activities';
import Agenda from './components/Agenda';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <About />
      <ScheduleStrip />
      <Features />
      <Activities />
      <Agenda />
      <Footer />
    </main>
  );
}
