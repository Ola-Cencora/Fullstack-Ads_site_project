import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Button from "../../common/Button/Button";
import clsx from "clsx";

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
      <Button color="warm-cool" content="new advert" />
    </Link>
  ) : null;

  return (
    <Navbar expanded={expanded} expand="lg" className={styles.navigation}>
      <Container>
        <Link className="text-decoration-none" to="/">
          <Navbar.Brand className="me-auto mx-2">
            Give me your advert!
          </Navbar.Brand>
        </Link>
        <Nav className={clsx("d-flex flex-row", styles.navigation__links)}>
          <Nav.Link onClick={() => setExpanded(false)} as={NavLink} to="/">
            Home
          </Nav.Link>
          {signOutLink}
          {signInLinks}
          {newAdvertButton}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
