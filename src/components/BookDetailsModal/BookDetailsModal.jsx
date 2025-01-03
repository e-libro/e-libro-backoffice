import React from "react";
import { Modal, Card, Button } from "react-bootstrap";

const BookDetailsModal = ({ show, onClose, book }) => {
  if (!book) return null;

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Libro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="border-0 shadow">
          {book.cover?.url && (
            <Card.Img
              variant="top"
              src={book.cover.url}
              alt={book.title}
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          )}


          <Card.Body>
          <Card.Title className="fw-bold mb-3 text-primary">{book.title}</Card.Title>
            <Card.Subtitle className="mb-3 text-secondary">
              {Array.isArray(book.authors)
                ? book.authors.map((author) => author.name).join(", ")
                : "Autor no disponible"}
            </Card.Subtitle>
            <Card.Text>
              <strong>Gutenberg ID:</strong> {book.gutenbergId || "N/A"}
            </Card.Text>
            <Card.Text>
              <strong>E-Libro ID:</strong> {book.id || "N/A"}
            </Card.Text>
            <Card.Text>
              <strong>Descargas:</strong> {book.downloads || 0}
            </Card.Text>
            <Card.Text>
              <strong>Contenido:</strong> <a href={book.content.url} target="_blank" rel="noopener noreferrer">Abrir</a>
            </Card.Text>



          </Card.Body>



        </Card>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookDetailsModal;
