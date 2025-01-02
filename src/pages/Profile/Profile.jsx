import React, { useState, useEffect } from "react";
import { Card, Form, Button, Container, Row, Col, Badge } from "react-bootstrap";
import authApi from "../../apis/authApi";

const Profile = () => {
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(""); // Estado para manejar errores

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authApi.me(); // Llamada a la API
        setUser(userData); // Guardar el usuario en el estado
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again.");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage("The new password and confirmation do not match.");
      return;
    }

    try {
      // Aquí deberías llamar a tu API para cambiar la contraseña
      setMessage("Password updated successfully.");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Failed to update the password. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
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
                  {user?.fullname?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h4 className="mb-0">{user?.fullname || "User"}</h4>
                  <p className="text-muted mb-0">{user?.email || "Not available"}</p>
                  <Badge bg="info" className="mt-2">
                    {user?.role || "Not assigned"}
                  </Badge>
                </div>
              </div>
              <hr />
              <Row>
                <Col>
                  <p>
                    <strong>ID:</strong> {user?.id || "Not available"}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(user?.createdAt).toLocaleDateString("en-US") || "Not available"}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="shadow-lg border-0">
            <Card.Body>
              <h4 className="mb-3">Change Password</h4>
              {message && <p className="text-center text-danger">{message}</p>}
              <Form onSubmit={handleChangePassword}>
                <Form.Group controlId="currentPassword" className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="newPassword" className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Change Password
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
