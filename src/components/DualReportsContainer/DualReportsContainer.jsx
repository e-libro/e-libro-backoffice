import React from "react";
import { Container } from "react-bootstrap";

const DualReportsContainer = ({ leftComponent, rightComponent, title }) => {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <h2 className="mb-4 text-center">{title}</h2>
      <div className="d-flex" style={{ width: "90%" }}>
        <div style={{ flex: 1, marginRight: "1rem" }}>{leftComponent}</div>
        <div style={{ flex: 1, marginLeft: "1rem" }}>{rightComponent}</div>
      </div>
    </Container>
  );
};
export default DualReportsContainer;
