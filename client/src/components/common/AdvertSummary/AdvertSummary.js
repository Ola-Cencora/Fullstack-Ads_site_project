import { Card, Button, Row, Col } from "react-bootstrap";
import styles from "./AdvertSummary.module.scss";

const AdvertSummary = () => (
  <Col sm={12} lg={6} xl={4}>
    <Card className={styles.advertCard} w-100>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>Vintage Radio</Card.Title>
        <Row className={styles.row}>
          <Col>Place</Col>
          <Col className="text-end">
            <Button className={styles.button}>see more</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </Col>
);

export default AdvertSummary;
