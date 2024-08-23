import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const NotFound = () => {
  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2>Página No Encontrada</h2>
          <p className="lead">Lo sentimos, la página que buscas no existe.</p>
          <Link to="/">
            <Button variant="primary">Volver a la Página Principal</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
