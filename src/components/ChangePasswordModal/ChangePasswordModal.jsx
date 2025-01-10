import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authApi from '../../apis/authApi'; // Importa el método desde authApi

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(6, 'La contraseña actual debe tener al menos 6 caracteres')
    .required('Debe ingresar la contraseña actual'),
  password: yup
    .string()
    .min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
    .required('Debe ingresar una nueva contraseña'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Debe confirmar la nueva contraseña'),
});

const ChangePasswordModal = ({ show, onClose,  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState(null); // Mensaje general
  const [messageType, setMessageType] = useState(null); // success o error
  const [errorDetails, setErrorDetails] = useState([]); // Detalles específicos del error

  useEffect(() => {
    if (!show) {
      reset(); // Limpia los campos cuando el modal se cierra
      setMessage(null); // Resetea mensajes
      setMessageType(null);
      setErrorDetails([]); // Resetea los detalles de errores
    }
  }, [show, reset]);

  const onSubmit = async ({ currentPassword, password }) => {
    try {
      const response = await authApi.changePassword(currentPassword, password);

      if (response.status === 'success') {
        setMessage('La contraseña se cambió exitosamente.');
        setMessageType('success');
        reset();
        setTimeout(() => onClose(), 2000); // Cierra el modal después de 2 segundos
      } else if (response.status === 'error') {
        setMessage(response.message || 'Ocurrió un error al cambiar la contraseña.');
        setMessageType('error');
        setErrorDetails(Array.isArray(response.error?.details) ? response.error.details : []); // Captura los detalles si son un array
        reset(); // Limpia los campos
      }
    } catch (e) {
      console.log('Error changing password:', e.error.code);
      if (e.error.code === 401 || e.error.code === 400) {
        const response = e.error;
        setMessage(response.message || 'Error de autenticación.');
        setMessageType('error');
        setErrorDetails(Array.isArray(e.error.details) ? e.error.details : []); // Captura los detalles si son un array
        reset(); // Limpia los campos
      } else {
        setMessage('No se pudo procesar la solicitud. Inténtalo más tarde.');
        setMessageType('error');
        setErrorDetails([]); // Asegura que no hay detalles
      }
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Mensajes de éxito o error */}
        {message && (
          <Alert variant={messageType === 'success' ? 'success' : 'danger'}>
            {message}
            {errorDetails.length > 0 && (
              <ul className="mt-2">
                {errorDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
          </Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Contraseña Actual */}
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña actual"
              autoComplete="current-password"
              {...register('currentPassword')}
              isInvalid={!!errors.currentPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.currentPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Nueva Contraseña */}
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Nueva Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa la nueva contraseña"
              autoComplete="new-password"
              {...register('password')}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirmar Contraseña */}
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirma la nueva contraseña"
              autoComplete="new-password"
              {...register('confirmPassword')}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Guardar Contraseña
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
