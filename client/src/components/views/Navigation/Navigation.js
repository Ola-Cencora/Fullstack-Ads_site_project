import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";

const Navigation = () => (
  <Navbar expand="lg" className={styles.navigation}>
    <Container>
      <Navbar.Brand className="me-auto mx-2">Give me your advert!</Navbar.Brand>
      <Nav className="ms-auto mx-2">
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
        {/* tutaj logika widoczności poniższych linków */}
        <Nav.Link as={NavLink} to="/">
          Sign out
        </Nav.Link>
        <Nav.Link as={NavLink} to="/login">
          Sign in
        </Nav.Link>
        <Nav.Link as={NavLink} to="/register">
          Sign up
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default Navigation;
