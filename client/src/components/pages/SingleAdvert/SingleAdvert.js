import { Card, Button, Row, Col } from "react-bootstrap";
import styles from "./SingleAdvert.module.scss";
import { useParams, Navigate } from "react-router-dom";
import { getAdvertById } from "../../../redux/advertsRedux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IMGS_URL } from "../../../config";

const SingleAdvert = () => {
  const { advertId } = useParams();
  const [loading, setLoading] = useState(true);
  const advertData = useSelector((state) => getAdvertById(state, advertId));

  useEffect(() => {
    if (advertData) setLoading(false);
  }, [advertData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!advertData) return <Navigate to="/" />;

  return (
    <Col md={9} className="mx-auto">
      <Card className={styles.advertCard}>
        <Card.Img
          variant="top"
          src={IMGS_URL + advertData.img}
          alt={advertData.title}
        />
        <Card.Body>
          <Card.Title>{advertData.title}</Card.Title>
          <Card.Title>{advertData.price} $</Card.Title>
          <Card.Text>{advertData.location}</Card.Text>
          <Card.Text className="my-4">{advertData.text}</Card.Text>
          <Row className={styles.row}>
            <Col>
              <img
                src={IMGS_URL + advertData.user.avatar}
                alt="user_avatar"
                className={styles.avatarImg}
              />
            </Col>
            <Col>{advertData.user.login}</Col>
            <Col>{advertData.user.phone}</Col>
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
};

export default SingleAdvert;
