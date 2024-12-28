import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
      <div className="p-3">
        <Card className="mb-3">
          <Card.Body>
            <h2>¡Página no encontrada!</h2>
            <p>
              <Link to="/">Volver al inicio</Link>
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }

export default NoMatch