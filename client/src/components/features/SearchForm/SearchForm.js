import { Form, Row, Col } from "react-bootstrap";
import styles from "./SearchForm.module.scss";
import { useState } from "react";
import { updateSearchPhrase } from "../../../redux/searchAdvertsRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
import clsx from "clsx";

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
    <Form
      onSubmit={handleSearch}
      className={clsx("d-flex justify-content-center", styles.search)}
    >
      <Row className="g-1 align-items-center">
        <Col sm={12} lg={8}>
          <Form.Control
            className={styles.form}
            type="text"
            placeholder="Looking for something?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col sm={12} lg={4} className="text-center">
          <Button type="submit" color="cool-main" content="search" />
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm;
