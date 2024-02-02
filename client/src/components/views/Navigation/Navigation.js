import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar expanded={expanded} expand="lg" className={styles.navigation}>
      <Container>
        <Navbar.Brand className="me-auto mx-2">
          Give me your advert!
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ms-auto mx-2">
            <Nav.Link onClick={() => setExpanded(false)} as={NavLink} to="/">
              Home
            </Nav.Link>
            {/* tutaj logika widoczności poniższych linków */}
            <Nav.Link onClick={() => setExpanded(false)} as={NavLink} to="/">
              Sign out
            </Nav.Link>
            <Nav.Link
              onClick={() => setExpanded(false)}
              as={NavLink}
              to="/login"
            >
              Sign in
            </Nav.Link>
            <Nav.Link
              onClick={() => setExpanded(false)}
              as={NavLink}
              to="/register"
            >
              Sign up
            </Nav.Link>
            <Link to={`/new`}>
              <Button className={styles.button}>new advert</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
