import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Table } from "react-bootstrap";
import reportApi from "../../apis/reportApi";

const TopBooksChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simula o utiliza una API real para obtener datos
        const response = await reportApi.getTop10Books(); // Reemplazar con tu API
        const totalDownloads = response.data.reduce((sum, book) => sum + book.downloads, 0);

        // Calcular porcentajes
        const enrichedData = response.data.map((book) => ({
          ...book,
          percentage: ((book.downloads / totalDownloads) * 100).toFixed(2), // Porcentaje con 2 decimales
        }));

        setData(enrichedData.slice(0, 10)); // Top 10
        setLoading(false);
      } catch (err) {
        console.error("Error fetching top books data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <p>Loading top books...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h3 className="text-center mb-4">Top 10 Most Downloaded Books</h3>
      
      {/* Gráfico de Barras */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="downloads" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Tabla de Datos */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Downloads</th>
            <th>Percentage (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.downloads}</td>
              <td>{book.percentage}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TopBooksChart;
