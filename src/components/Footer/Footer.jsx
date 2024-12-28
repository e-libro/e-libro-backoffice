// /src/components/Footer/Footer.jsx 
import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-3 shadow-sm mt-auto">
      <Container>
        <small>© {new Date().getFullYear()} E-Libro. Todos los derechos reservados.</small>
      </Container>
    </footer>
  );
}

export default Footer;
