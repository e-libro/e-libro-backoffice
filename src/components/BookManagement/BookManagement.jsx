import React, { useState } from "react";
import { Table, Button, Container, Pagination, Spinner, Image } from "react-bootstrap";
import bookApi from "../../apis/bookApi";

// --------------------------------------------------------------------
//  Lógica para generar las páginas a mostrar en la paginación
// --------------------------------------------------------------------
function getPageNumbers(totalPages) {
  // Si tenemos pocas páginas, mostramos todas
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Primeras 5
  const startPages = [1, 2, 3, 4, 5];
  // Últimas 5
  const endPages = [
    totalPages - 4,
    totalPages - 3,
    totalPages - 2,
    totalPages - 1,
    totalPages,
  ];

  // Retornamos con placeholder
  return [...startPages, "...", ...endPages];
}

const BookManagement = () => {
  // ESTADOS
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filtros de búsqueda
  const [filters, setFilters] = useState({
    title: "",
    author: "",
  });

  /**
   * fetchBooks
   * Llama al endpoint /books con los parámetros actuales.
   * Si no se pasa 'page', por defecto es 1.
   */
  const fetchBooks = async (page = 1) => {
    setLoading(true);
    try {
      // Petición al endpoint
      const response = await bookApi.getAllBooks({
        page,
        limit: 5, // Ajusta si deseas otro número de resultados por página
        title: filters.title,
        author: filters.author,
      });

      // Estructura de la respuesta según lo que nos compartiste:
      // {
      //   totalBooks,
      //   totalPages,
      //   page,
      //   limit,
      //   books,
      //   language
      // }
      const { totalBooks, totalPages, page: currentPageAPI, limit, books, language } = response;

      // Actualizar estados
      setBooks(books || []);
      setTotalPages(totalPages || 1);
      setCurrentPage(currentPageAPI || 1);

      // (Opcional) Consola para depuración
      console.log("Language:", language);
      console.log("Total libros:", totalBooks);
      console.log("Límite actual:", limit);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleSearch
   * Se dispara cuando el usuario hace clic en el botón "Buscar".
   * Reinicia la búsqueda en la página 1.
   */
  const handleSearch = () => {
    fetchBooks(1);
  };

  /**
   * handlePageChange
   * Cambia la página y vuelve a llamar a la API.
   */
  const handlePageChange = (page) => {
    // Si el usuario hace clic en "..." no hacemos nada
    if (page === "...") return;

    setCurrentPage(page);
    fetchBooks(page);
  };

  /**
   * handleFilterChange
   * Actualiza el estado de filtros a medida que el usuario escribe en los campos.
   */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * handleClearFilters
   * Limpia los filtros y permanece en la misma página (o decide si fetchBooks(1)).
   */
  const handleClearFilters = () => {
    setFilters({ title: "", author: "" });
  };

  // --------------------------------------------------------------------
  //  Render
  // --------------------------------------------------------------------
  return (
    <Container className="my-5">
      <h2 className="mb-4">Gestión de Libros</h2>

      {/* Sección de filtros */}
      <div className="mb-4 d-flex align-items-center">
        <input
          type="text"
          name="title"
          placeholder="Buscar por título"
          value={filters.title}
          onChange={handleFilterChange}
          className="form-control w-auto me-2"
        />
        <input
          type="text"
          name="author"
          placeholder="Buscar por autor"
          value={filters.author}
          onChange={handleFilterChange}
          className="form-control w-auto me-2"
        />
        <Button variant="primary" onClick={handleSearch} className="me-2">
          Buscar
        </Button>
        <Button variant="secondary" onClick={handleClearFilters}>
          Limpiar Filtros
        </Button>
      </div>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {/* Tabla de Libros */}
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Portada</th>
                <th>Título</th>
                <th>Autores</th>
                <th>Descargas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => {
                  const authorsDisplay = Array.isArray(book.authors)
                    ? book.authors.map((a) => a.name).join(", ")
                    : "N/A";

                  return (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>
                        {book.cover && book.cover.url ? (
                          <Image
                            src={book.cover.url}
                            alt={book.title}
                            thumbnail
                            width={50}
                          />
                        ) : (
                          "Sin portada"
                        )}
                      </td>
                      <td>{book.title}</td>
                      <td>{authorsDisplay}</td>
                      <td>{book.donwloads || 0}</td>
                      <td>
                        <Button variant="info" size="sm" className="me-2">
                          Editar
                        </Button>
                        <Button variant="danger" size="sm">
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No se encontraron libros.
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
        </>
      )}
    </Container>
  );
};

export default BookManagement;
