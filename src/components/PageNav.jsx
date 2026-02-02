import { Link, useLocation } from 'react-router-dom';
import './PageNav.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'About', href: '/about' },
];

export default function PageNav() {
  const location = useLocation();

  return (
    <nav className="page-nav" aria-label="Main navigation">
      <div className="page-nav__container">
        <Link to="/" className="page-nav__logo">
          Zach Larson
        </Link>
        <div className="page-nav__links">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`page-nav__link ${location.pathname === item.href ? 'page-nav__link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
