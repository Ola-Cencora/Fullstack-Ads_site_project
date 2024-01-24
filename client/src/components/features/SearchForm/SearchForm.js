import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./SearchForm.module.scss";

const SearchForm = () => (
  <Form className={styles.search}>
    <Row className="g-1">
      <Col sm={12} lg={8}>
        <Form.Control
          className={styles.form}
          type="text"
          placeholder="Looking for something?"
        />
      </Col>
      <Col sm={12} lg={4} className={styles.buttonCol}>
        <Button className={styles.button}>search</Button>
      </Col>
    </Row>
  </Form>
);

export default SearchForm;
