// /src/components/Sidebar/Sidebar.jsx 
import { useState } from 'react';
import { ListGroup, Collapse } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaTachometerAlt,
  FaChevronDown,
  FaChartPie,
  FaUserCircle,
  FaCogs,
  FaSignOutAlt,
  FaUsers,
  FaBook
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

function Sidebar() {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const toggleDashboardMenu = () => setDashboardOpen(!dashboardOpen);
  const { signout } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signout(); // Llama a la función para cerrar sesión
      navigate("/login"); // Redirige al login tras cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="bg-light position-fixed h-100 overflow-auto shadow" style={{ width: "200px", top: "56px" }}>
      <ListGroup variant="flush" className="pt-2">
        <ListGroup.Item action as={Link} to="/">
          <FaHome className="me-2" /> Inicio
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/protected/about">
          <FaInfoCircle className="me-2" /> Acerca de
        </ListGroup.Item>
        <ListGroup.Item action onClick={toggleDashboardMenu}>
          <FaTachometerAlt className="me-2" /> Dashboard
          <FaChevronDown className="ms-auto" style={{ transition: "transform 0.3s", transform: dashboardOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
        </ListGroup.Item>
        <Collapse in={dashboardOpen}>
          <div>
            <ListGroup variant="flush" className="ms-3">
              <ListGroup.Item action as={Link} to="/protected/dashboard/overview">
                <FaChartPie className="me-2" /> Libros
              </ListGroup.Item>
              <ListGroup.Item action as={Link} to="/protected/dashboard/overview">
                <FaChartPie className="me-2" /> Usuarios
              </ListGroup.Item>
              {/* <ListGroup.Item action as={Link} to="/dashboard/profile">
                <FaUserCircle className="me-2" /> Perfil
              </ListGroup.Item>
              <ListGroup.Item action as={Link} to="/dashboard/settings">
                <FaCogs className="me-2" /> Configuración
              </ListGroup.Item> */}
            </ListGroup>
          </div>
        </Collapse>
        <ListGroup.Item action as={Link} to="/protected/dashboard/user-management">
          <FaUsers className="me-2" /> Gestión de usuarios
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/protected/dashboard/book-management">
          <FaBook className="me-2" /> Gestión de libros
        </ListGroup.Item>
        {/* Línea separadora */}
        
        {/* Elemento para cerrar sesión */}
        <ListGroup.Item action onClick={handleSignOut} className=" text-danger">
          <FaSignOutAlt className="me-2" /> Cerrar Sesión
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;
