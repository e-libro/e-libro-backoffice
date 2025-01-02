import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  fullname: yup.string().min(4, 'El nombre completo debe tener al menos 4 caracteres').required('El nombre completo es obligatorio'),
  role: yup.string().oneOf(['user', 'admin'], 'El rol debe ser user o admin').required('El rol es obligatorio'),
});

const UpdateUserModal = ({ show, onClose, onUpdate, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (show) {
      reset(initialData); // Inicializa el formulario con los datos actuales del usuario
    }
  }, [show, initialData, reset]);

  const onSubmit = async (data) => {
    try {
      await onUpdate(data); // Llama a la función para actualizar el usuario
      reset();
      onClose();
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      alert('No se pudo actualizar el usuario. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Nombre Completo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre completo"
              autoComplete="off"
              {...register('fullname')}
              isInvalid={!!errors.fullname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullname?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Rol</Form.Label>
            <Form.Select {...register('role')} isInvalid={!!errors.role}>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.role?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Actualizar Usuario
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateUserModal;
