import { useState, useEffect } from "react";
import { Table, Button, Container, Pagination, Spinner } from "react-bootstrap";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import apiClient from "../../apis/ApiClient";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Usuario seleccionado para eliminar
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado del modal


  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/users?page=${page}`);
      const { users, totalPages } = response.data;

      setUsers(users);
      setTotalPages(totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const handleDeleteSuccess = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Actualiza la lista de usuarios
  };


  return (
    <Container className="my-5">
      <h2 className="mb-4">Gestión de Usuarios</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* Tabla de Usuarios */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString("es-ES")}</td>
                    <td>
                      <Button variant="info" size="sm" className="me-2">
                        Editar
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleOpenDeleteModal(user.id)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Paginación */}
          <Pagination className="justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>

          {/* Modal de Confirmación */}
          <DeleteUserModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            userId={selectedUserId}
            onDeleteSuccess={handleDeleteSuccess}
          />

        </>
      )}
    </Container>
  );
};

export default UserManagement;
