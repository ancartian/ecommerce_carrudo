import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import { CartWidget } from "./CartWidget";

export const NavBar = () => (
  <>
  <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/category/cursos">Cursos</Nav.Link>
            <Nav.Link as={NavLink} to="/category/servicios">Servicios</Nav.Link>
          </Nav>
          <CartWidget/>
        </Container>
      </Navbar>
  </>
);
