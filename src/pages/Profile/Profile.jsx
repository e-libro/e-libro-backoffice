import React, { useState } from "react";
import { Card, Form, Button, Container, Row, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { authState } = useAuth(); // Accede a los datos del usuario desde el contexto
  const user = authState.user;

  // Estado para manejar el formulario de cambio de contraseña
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("La nueva contraseña y la confirmación no coinciden.");
      return;
    }

    try {
      // Aquí deberías llamar a un endpoint de tu API para cambiar la contraseña
      // await apiClient.post('/auth/change-password', {
      //   currentPassword: passwords.currentPassword,
      //   newPassword: passwords.newPassword,
      // });

      setMessage("Contraseña actualizada con éxito.");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setMessage("Hubo un error al cambiar la contraseña. Inténtalo nuevamente.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Tarjeta de Datos del Usuario */}
          <Card className="shadow-lg mb-4 border-0">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    fontSize: "24px",
                    marginRight: "20px",
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h4 className="mb-0">{user?.name || "Usuario"}</h4>
                  <p className="text-muted mb-0">{user?.email || "No disponible"}</p>
                  <Badge bg="info" className="mt-2">
                    {user?.role || "No asignado"}
                  </Badge>
                </div>
              </div>
              <hr />
              <Row>
                <Col>
                  <p>
                    <strong>ID:</strong> {user?.id || "No disponible"}
                  </p>
                  <p>
                    <strong>Fecha de creación:</strong>{" "}
                    {new Date(user?.createdAt).toLocaleDateString("es-ES") || "No disponible"}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Formulario de Cambio de Contraseña */}
          <Card className="shadow-lg border-0">
            <Card.Body>
              <h4 className="mb-3">Cambiar Contraseña</h4>
              {message && <p className="text-center text-danger">{message}</p>}
              <Form onSubmit={handleChangePassword}>
                <Form.Group controlId="currentPassword" className="mb-3">
                  <Form.Label>Contraseña Actual</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="newPassword" className="mb-3">
                  <Form.Label>Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Cambiar Contraseña
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;



