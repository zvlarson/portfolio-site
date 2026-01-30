import Container from './ui/Container';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <p className="footer__copyright">
            {currentYear} Zachary Larson. All rights reserved.
          </p>
          <p className="footer__built">
            Built with React
          </p>
        </div>
      </Container>
    </footer>
  );
}
