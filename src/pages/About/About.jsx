import React from "react";
import { Card, Container, Image } from "react-bootstrap";

const About = () => {
  return (
    <Container className="my-5">
      <Card className="shadow-lg">
        <Card.Body>
          {/* Logo de UNIR */}
          <div className="text-center mb-4">
            <Image src="/assets/unir-logo.png" alt="Logo UNIR" fluid />
          </div>

          <h1 className="text-center mb-4">Universidad Internacional de La Rioja</h1>
          <h3 className="text-center mb-4">Escuela Superior de Ingeniería y Tecnología</h3>
          <h4 className="text-center mb-4">
            Máster Universitario en Ingeniería de Software y Sistemas Informáticos
          </h4>
          {/* Título principal con color azul */}
          <h2
            className="text-center mb-5"
            style={{ color: "#007bff" }} // Aplica el color azul
          >
            E-Libro: Lector de Libros Digitales del Dominio Público para Dispositivos Móviles
          </h2>

          <div className="text-center">
            <p className="mb-1"><strong>Trabajo fin de estudio presentado por:</strong></p>
            <p>Alfredo Ernesto Arias Corporan</p>
            <p className="mb-1"><strong>Tipo de trabajo:</strong></p>
            <p>Desarrollo Práctico</p>
            <p className="mb-1"><strong>Director/a:</strong></p>
            <p>Miguel Ángel Muñoz Alvarado</p>
            <p className="mb-1"><strong>Fecha:</strong></p>
            <p>12-18-2024</p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default About;
