import React from "react";
import { Container } from "react-bootstrap";

const UsersReportsContainer = ({ children }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <div style={{ width: "50%" }}>{children}</div>
    </Container>
  );
};

export default UsersReportsContainer;
