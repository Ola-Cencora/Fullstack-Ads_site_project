import { Card, Button, Row, Col } from "react-bootstrap";
import styles from "./AdvertSummary.module.scss";
import { IMGS_URL } from "../../../config";

const AdvertSummary = ({ title, location, price, img }) => {
  return (
    <Col sm={12} lg={6} xl={4}>
      <Card className={styles.advertCard}>
        <Card.Img variant="top" src={IMGS_URL + img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Row className={styles.row}>
            <Col>
              <b>{price} $</b>
            </Col>
            <Col>{location}</Col>
            <Col className="text-end">
              <Button className={styles.button}>see more</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdvertSummary;
