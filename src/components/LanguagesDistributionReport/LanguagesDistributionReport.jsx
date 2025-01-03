import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import reportApi from "../../apis/reportApi";

const LanguagesDistributionReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxScale, setMaxScale] = useState(0);

  const fetchLanguagesDistribution = async () => {
    setLoading(true);
    try {
      const { data } = await reportApi.getLanguagesDistribution();

      // Calcular la escala máxima basada en el idioma con más libros
      const maxCount = Math.max(...data.map((item) => item.count));
      setMaxScale(maxCount);

      // Formatear los datos directamente desde la respuesta
      setData(data);
    } catch (error) {
      console.error("Error fetching languages distribution:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguagesDistribution();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="mb-4">Distribución de Idiomas en los Libros</h2>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart outerRadius={90} width={730} height={250} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="language" />
            <PolarRadiusAxis domain={[0, maxScale]} angle={30} />
            <Tooltip />
            <Radar name="Idiomas" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </Container>
  );
};

export default LanguagesDistributionReport;
