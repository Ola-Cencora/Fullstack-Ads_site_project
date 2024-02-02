import { Card, Button, Row, Col } from "react-bootstrap";
import styles from "./AdvertSummary.module.scss";
import { IMGS_URL } from "../../../config";
import { Link } from "react-router-dom";

const AdvertSummary = ({ id, title, location, price, img }) => {
  return (
    <Col sm={12} lg={6} xl={4}>
      <Card className={styles.advertCard}>
        <Card.Img variant="top" src={IMGS_URL + img} alt={title} className={styles.img} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Row className={styles.row}>
            <Col>
              <b>{price} $</b>
            </Col>
            <Col>{location}</Col>
            <Col className="text-end">
              <Link to={`/adverts/${id}`}>
                <Button className={styles.button}>see more</Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdvertSummary;
