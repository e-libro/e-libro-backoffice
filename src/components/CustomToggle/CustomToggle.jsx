// src/components/CustomToggle/CustomToggle.js
import React from 'react';

// Componente de toggle personalizado sin el caret
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="#"
    className="nav-link d-flex align-items-center"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export default CustomToggle;
