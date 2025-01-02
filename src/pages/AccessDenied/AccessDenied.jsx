import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default AccessDenied;
