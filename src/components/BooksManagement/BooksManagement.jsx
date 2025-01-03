import React, { useState, useEffect } from "react";
import { Table, Button, Container, Pagination, Spinner, Image } from "react-bootstrap";
import apiClient from "../../apis/apiClient";
import BookDetailsModal from "../BookDetailsModal/BookDetailsModal";

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

const BooksManagement = () => {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    author: "",
  });

  const fetchBooks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/books`, {
        params: { page, limit: 5, title: filters.title, author: filters.author },
      });

      const { data } = response.data;
      const { totalDocuments, totalPages, documents } = data;

      setBooks(documents || []);
      setTotalPages(totalPages || 1);
      setCurrentPage(page);

      console.log(`Total libros: ${totalDocuments}`);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    if (page === "...") return;
    setCurrentPage(page);
    fetchBooks(page);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ title: "", author: "" });
  };

  const handleDownload = (url) => {
    window.open(url, "_blank");
  };

  const handleShowDetails = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Gestión de Libros</h2>

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
        <Button variant="primary" onClick={() => fetchBooks(1)} className="me-2">
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
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th className="text-center">Portada</th>
                <th>Título</th>
                <th>Autores</th>
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
                      <td className="text-center">
                        {book.cover?.url ? (
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
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleDownload(book.content.url)}
                        >
                          Descargar
                        </Button>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleShowDetails(book)}
                        >
                          Detalles
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No se encontraron libros.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

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

          <BookDetailsModal
            show={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            book={selectedBook}
          />
        </>
      )}
    </Container>
  );
};

export default BooksManagement;
