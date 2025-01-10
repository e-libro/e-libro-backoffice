import { useState, useEffect } from "react";
import { Table, Button, Container, Pagination, Spinner, Badge } from "react-bootstrap";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import UserDetailsModal from "../UserDetailsModal/UserDetailsModal"; // Importa el nuevo modal
import AddUserModal from "../AddUserModal/AddUserModal"; // Importa el modal de agregar usuario
import UpdateUserModal from "../UpdateUserModal/UpdateUserModal"; // Importa el modal de actualizar usuario
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal"; // Importa el modal de cambiar contraseña
import userApi from "../../apis/userApi";
// --------------------------------------------------------------------
//  Lógica para generar las páginas a mostrar en la paginación
// --------------------------------------------------------------------
function getPageNumbers(totalPages) {
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const startPages = [1, 2, 3, 4, 5];
  const endPages = [
    totalPages - 4,
    totalPages - 3,
    totalPages - 2,
    totalPages - 1,
    totalPages,
  ];

  return [...startPages, "...", ...endPages];
}

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para el modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // Estado del modal de detalles
  const [showAddUserModal, setShowAddUserModal] = useState(false); // Estado del modal de agregar usuario
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false); // Estado del modal de actualizar usuario
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false); // Estado del modal de cambiar contraseña

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await userApi.getAllUsers({params: { page, limit: 5, role: "admin" }});
      const { totalPages, documents } = response.data;

      setUsers(documents || []);
      setTotalPages(totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, showDeleteModal, showUpdateUserModal]);

  const handlePageChange = (page) => {
    if (page === "...") return;
    setCurrentPage(page);
    fetchUsers(page);
  };

  const handleOpenDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const handleDeleteSuccess = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleOpenDetailsModal = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
    setShowUpdateUserModal(true);
  };

  const handleOpenChangePasswordModal = (userId) => {
    setSelectedUserId(userId);
    setShowChangePasswordModal(true);
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    try {
      setShowChangePasswordModal(false);
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      alert("No se pudo cambiar la contraseña. Por favor, inténtelo de nuevo.");
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      
      // Llama a la API para agregar un nuevo usuario
      const response = await userApi.createUser(newUser);
      const createdUser = response.data;
  
      // Actualiza el estado con el nuevo usuario
      setUsers((prevUsers) => [createdUser, ...prevUsers]);
      alert("Usuario agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("No se pudo agregar el usuario. Por favor, inténtelo de nuevo.");
    }
  };
  
  const handleUpdateUser = async (updatedUser) => {
    try {
      // Llama a la API para actualizar el usuario
      const response = await userApi.updateUser(updatedUser.id, updatedUser);
      const updatedData = response.data;
  
      // Actualiza el estado con los datos actualizados
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedData.id ? updatedData : user))
      );
      alert("Usuario actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("No se pudo actualizar el usuario. Por favor, inténtelo de nuevo.");
    }
  };
  

  return (
    <Container className="my-5">
      <h2 className="mb-4">Gestión de Usuarios</h2>

      <Button variant="primary" className="mb-3" onClick={() => setShowAddUserModal(true)}>
        Agregar Usuario
      </Button>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* Tabla de Usuarios */}
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
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
                                        <td>
                      <Button
                        variant="link"
                        className="p-0 text-decoration-none"
                        onClick={() => handleOpenDetailsModal(user)}
                      >
                        {user.fullname}
                      </Button>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <Badge bg={user.role === "admin" ? "danger" : "secondary"}>
                        {user.role}
                      </Badge>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString("es-ES")}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenUpdateModal(user)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenChangePasswordModal(user.id)}
                      >
                        Cambiar Contraseña
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
            {getPageNumbers(totalPages).map((page, idx) => (
              <Pagination.Item
                key={idx}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
                disabled={page === "..."}
              >
                {page}
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

          {/* Modal de Detalles del Usuario */}
          <UserDetailsModal
            show={showDetailsModal}
            onHide={() => setShowDetailsModal(false)}
            user={selectedUser}
          />

          {/* Modal de Agregar Usuario */}
          <AddUserModal
            show={showAddUserModal}
            onClose={() => setShowAddUserModal(false)}
            onSave={handleAddUser}
          />

          {/* Modal de Actualizar Usuario */}
          <UpdateUserModal
            show={showUpdateUserModal}
            onClose={() => setShowUpdateUserModal(false)}
            onUpdate={handleUpdateUser}
            initialData={selectedUser}
          />

          {/* Modal de Cambiar Contraseña */}
          <ChangePasswordModal
            show={showChangePasswordModal}
            onClose={() => setShowChangePasswordModal(false)}
            onSave={handleChangePassword}
          />
        </>
      )}
    </Container>
  );
};

export default UsersManagement;
