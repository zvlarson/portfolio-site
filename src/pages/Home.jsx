import PageNav from '../components/PageNav';
import Hero from '../components/Hero';
import Proof from '../components/Proof';
import Testimonials from '../components/Testimonials';
import Projects from '../components/Projects';
import About from '../components/About';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        description="Enterprise transformation leader specializing in people, strategy, and operations. View case studies, testimonials, and learn about my approach."
      />
      <PageNav />
      <Hero />
      <Proof />
      <Testimonials />
      <Projects />
      <About />
      <Footer />
    </>
  );
}
