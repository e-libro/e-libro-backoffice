import React from "react";
import { Modal, Button } from "react-bootstrap";
import apiClient from "../../apis/ApiClient";

const DeleteUserModal = ({ show, onHide, userId, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      await apiClient.delete(`/users/${userId}`);
      onDeleteSuccess(userId); // Notifica al componente padre sobre la eliminación
      onHide(); // Cierra el modal
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas eliminar este usuario?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
