import React from "react";
import { Modal, Button, Card, Badge } from "react-bootstrap";

const UserDetailsModal = ({ show, onHide, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <div className="d-flex align-items-center mb-4">
              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{
                  width: "80px",
                  height: "80px",
                  fontSize: "32px",
                  marginRight: "20px",
                }}
              >
                {user.fullname?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h4 className="mb-0">{user.fullname || "Usuario Desconocido"}</h4>
                <p className="text-muted mb-0">{user.email || "Sin correo"}</p>
                <Badge bg="info" className="mt-2">{user.role || "No asignado"}</Badge>
              </div>
            </div>
            <hr />
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Fecha de Creación:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong>Última Actualización:</strong>{" "}
              {new Date(user.updatedAt).toLocaleDateString("es-ES")}
            </p>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsModal;
