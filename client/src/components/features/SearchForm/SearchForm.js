import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./SearchForm.module.scss";
import { useState } from "react";
import { updateSearchPhrase } from "../../../redux/searchAdvertsRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateSearchPhrase(search));
    setSearch("");
    navigate(`/search/${search}`);
  };

  return (
    <Form onSubmit={handleSearch} className={styles.search}>
      <Row className="g-1">
        <Col sm={12} lg={8}>
          <Form.Control
            className={styles.form}
            type="text"
            placeholder="Looking for something?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col sm={12} lg={4} className={styles.buttonCol}>
          <Button className={styles.button} type="submit">
            search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
