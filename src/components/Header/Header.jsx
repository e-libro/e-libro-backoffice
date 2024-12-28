import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import CustomToggle from "../CustomToggle/CustomToggle";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const {authState, signout } = useAuth();
  const navigate = useNavigate();
  const userName = authState.user.fullname || "User Name}";

  const handleSignout = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      console.error("Error signing out", error);
    }
  }

  return (
    <Navbar
      expand="md"
      fixed="top"
      className="shadow"
      style={{ backgroundColor: "#f6f8fa" }} // Color similar al header de GitHub
    >
      <Container fluid>
        {/* Logo y nombre de la empresa */}
        <Navbar.Brand href="#" className="d-flex align-items-center me-2">
          {/* Placeholder SVG para el logo */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            className="me-2"
          >
            <rect width="40" height="40" fill="#007bff" />
            <text x="20" y="25" fontSize="20" textAnchor="middle" fill="#fff">
              EL
            </text>
          </svg>
          <span className="text-dark">E-Libro</span>
        </Navbar.Brand>

        {/* Botón de colapso para pantallas pequeñas */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Contenido del Navbar */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* <Nav.Link
              as={Link}
              to="/notifications"
              className="d-flex align-items-center text-dark"
            >
              <FaBell className="me-1" />
              <span className="d-none d-md-inline">Notificaciones</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/messages"
              className="d-flex align-items-center text-dark"
            >
              <FaEnvelope className="me-1" />
              <span className="d-none d-md-inline">Mensajes</span>
            </Nav.Link> */}

            {/* Separador */}
            <div className="vr mx-3 d-none d-md-block"></div>

            {/* Menú de usuario */}
            <Dropdown align="end" as={Nav.Item}>
              <Dropdown.Toggle as={CustomToggle} id="user-menu">
                <div className="d-flex align-items-center">
                  {/* Placeholder SVG para la foto de perfil */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="me-2 flex-shrink-0"
                  >
                    <circle cx="16" cy="16" r="16" fill="#6a737d" />
                    <text
                      x="16"
                      y="21"
                      fontSize="16"
                      textAnchor="middle"
                      fill="#fff"
                    >
                      {userName.charAt(0)}
                    </text>
                  </svg>
                  <span className="text-nowrap text-dark">{userName}</span>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/dashboard/profile">
                  <FaUser className="me-2" />
                  Perfil
                </Dropdown.Item>
                {/* <Dropdown.Item as={Link} to="/settings">
                  <FaCog className="me-2" />
                  Configuración
                </Dropdown.Item> */}
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>
                  <FaSignOutAlt className="me-2" />
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;