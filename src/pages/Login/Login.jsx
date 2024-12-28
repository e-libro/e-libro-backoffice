import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Notification from '../../components/Notification/Notification.jsx';

const schema = yup.object().shape({
  email: yup.string().email('Correo electrónico inválido').required('El correo es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
});

function Login() {
  const [errorMessage, setErrorMessage] = useState(false);
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { signin, authState } = useAuth();

  useEffect(() => {
    if (authState.authenticated) {
      navigate("/dashboard"); 
    }
  }, [authState, navigate]);
  
  const onSubmit = async (data) => {
    try {
      const response = await signin(data.email, data.password);
      if (!response.error) {
        navigate('/dashboard');
      } else {
        setErrorMessage(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage("El servidor no responde. Inténtalo más tarde.");
    }
  };


  return (

    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>

    {errorMessage && (
          <Notification
            message={errorMessage}
            variant="danger"
            onClose={() => setErrorMessage(null)} // Cierra la alerta manualmente
          />
    )}


      <Card className="shadow-sm" style={{ width: '360px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                {...register('email')}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                {...register('password')}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Iniciar Sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
