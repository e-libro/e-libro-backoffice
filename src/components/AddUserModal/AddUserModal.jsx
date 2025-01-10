import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


const schema = yup.object().shape({
  fullname: yup.string().min(4, 'El nombre completo debe tener al menos 4 caracteres').required('El nombre completo es obligatorio'),
  email: yup.string().email('Correo electrónico inválido').required('El correo es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
  role: yup.string().oneOf(['user', 'admin'], 'El rol debe ser user o admin').required('El rol es obligatorio'),
});

const AddUserModal = ({ show, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      onSave(data); // Pasa el usuario creado al callback onSave
      reset();
      onClose();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('No se pudo crear el usuario. Por favor, inténtelo de nuevo.');
    }
  };

  useEffect(() => {
    if (!show) {
      reset(); // Limpia los campos cuando el modal se cierra
    }
  }, [show, reset]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Usuario</Modal.Title>
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

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa el correo electrónico"
              autoComplete="off"
              {...register('email')}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa una contraseña"
              autoComplete="off"
              {...register('password')}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
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
            Guardar Usuario
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserModal;
