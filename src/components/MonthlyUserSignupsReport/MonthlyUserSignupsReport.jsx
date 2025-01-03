import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import reportApi from "../../apis/reportApi";

const MonthlyUserSignupsReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsersReport = async () => {
    setLoading(true);
    try {
      const { data } = await reportApi.getMonthlyUserSignups();
      setData(data);
    } catch (error) {
      console.error("Error fetching users report by month:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersReport();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Reporte de Usuarios por Mes</h2>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Usuarios" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

export default MonthlyUserSignupsReport;
