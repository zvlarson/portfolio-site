import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudies from './pages/CaseStudies';
import CaseStudy from './pages/CaseStudy';
import TestimonialsPage from './pages/TestimonialsPage';
import AboutPage from './pages/AboutPage';
import Family from './pages/Family';
import RequestVideo from './pages/RequestVideo';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudy />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/family" element={<Family />} />
        <Route path="/request-video" element={<RequestVideo />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
