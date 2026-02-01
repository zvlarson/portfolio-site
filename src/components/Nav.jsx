import { useState, useEffect } from 'react';
import './Nav.css';

const navItems = [
  { label: 'Impact', href: '#impact' },
  { label: 'Case Studies', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Connect', href: '#connect' },
];

export default function Nav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past 300px (roughly past hero intro)
      setIsVisible(window.scrollY > 300);

      // Determine active section
      const sections = ['impact', 'projects', 'about', 'connect'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80; // Account for nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Add highlight effect after scroll completes
      setTimeout(() => {
        element.classList.add('section--highlight');
        setTimeout(() => {
          element.classList.remove('section--highlight');
        }, 2000);
      }, 500);
    }
  };

  return (
    <nav className={`nav ${isVisible ? 'nav--visible' : ''}`} aria-label="Main navigation">
      <div className="nav__pill">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`nav__link ${activeSection === item.href.replace('#', '') ? 'nav__link--active' : ''}`}
            onClick={(e) => handleClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
