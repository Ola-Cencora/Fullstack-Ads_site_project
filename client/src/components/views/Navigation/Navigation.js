import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Navigation = () => {
  const userLogged = useSelector(getUser);
  const [expanded, setExpanded] = useState(false);

  const signOutLink = userLogged ? (
    <Nav.Link onClick={() => setExpanded(false)} as={NavLink} to="/logout">
      Sign out
    </Nav.Link>
  ) : null;

  const signInLinks = !userLogged ? (
    <>
      <Nav.Link onClick={() => setExpanded(false)} as={NavLink} to="/login">
        Sign in
      </Nav.Link>
      <Nav.Link onClick={() => setExpanded(false)} as={NavLink} to="/register">
        Sign up
      </Nav.Link>
    </>
  ) : null;

  const newAdvertButton = userLogged ? (
    <Link to={`/new`}>
      <Button className={styles.button}>new advert</Button>
    </Link>
  ) : null;

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
            {signOutLink}
            {signInLinks}
            {newAdvertButton}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
