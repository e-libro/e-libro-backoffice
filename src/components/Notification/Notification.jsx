import { useEffect } from 'react'
import { Alert } from 'react-bootstrap';
import './Notification.css'

const Notification = ({message, variant = "danger", duration = 3000, onClose}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onClose) onClose();
    }, duration)
  
    return () => clearTimeout(timeout)
  }, [duration, onClose])


  return (
    <Alert
        variant={variant}
        dismissible
        onClose={onClose} // Permite cerrar la alerta manualmente
        className="alert-custom"
    >
        {message}
    </Alert>
  )
}

export default Notification