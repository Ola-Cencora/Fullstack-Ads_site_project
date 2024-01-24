import { Card, Button, Row, Col } from "react-bootstrap";
import styles from "./SingleAdvert.module.scss";

const SingleAdvert = () => (
  <Col>
    <Card className={styles.advertCard} w-100>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>Vintage Radio</Card.Title>
        <Card.Text>Place</Card.Text>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Card.Text>
        <Row className={styles.row}>
          <Col>avatar</Col>
          <Col>login</Col>
          <Col>tel</Col>
        </Row>
        <Row>
          <Col className="text-end">
            <Button className={styles.button}>edit</Button>
            <Button className={styles.button}>delete</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
);

export default SingleAdvert;
