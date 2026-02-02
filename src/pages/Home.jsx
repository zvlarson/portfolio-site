import Nav from '../components/Nav';
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
        description="Full-stack software engineer specializing in building exceptional digital experiences. View my portfolio, case studies, and testimonials."
      />
      <Nav />
      <Hero />
      <Proof />
      <Testimonials />
      <Projects />
      <About />
      <Footer />
    </>
  );
}
