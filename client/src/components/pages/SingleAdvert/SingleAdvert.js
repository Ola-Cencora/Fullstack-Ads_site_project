import { Card, Row, Col } from "react-bootstrap";
import styles from "./SingleAdvert.module.scss";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import {
  getAdvertById,
  deleteAdvertRequest,
} from "../../../redux/advertsRedux";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IMGS_URL } from "../../../config";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import Button from "../../common/Button/Button";

const SingleAdvert = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { advertId } = useParams();

  const [loading, setLoading] = useState(true);

  const advertData = useSelector((state) => getAdvertById(state, advertId));
  const userLogged = useSelector(getUser);

  useEffect(() => {
    if (advertData) setLoading(false);
  }, [advertData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    dispatch(deleteAdvertRequest(advertId));
    navigate("/");
  };

  const formattedDate = new Date(advertData.date).toLocaleDateString();

  if (!advertData) return <Navigate to="/" />;

  return (
    <Col md={9} className="mx-auto">
      <Card className={styles.advertCard}>
        <Card.Img
          variant="top"
          src={IMGS_URL + advertData.img}
          alt={advertData.title}
          className={styles.img}
        />
        <Card.Body>
          <Card.Title>{advertData.title}</Card.Title>
          <Card.Title>{advertData.price} $</Card.Title>
          <Card.Text className="mb-1">{advertData.location}</Card.Text>
          <Card.Text className="text-muted">
            <small>{formattedDate}</small>
          </Card.Text>
          <Card.Text className="my-4">{advertData.text}</Card.Text>
          <Row className={styles.row}>
            <Col>
              <img
                src={IMGS_URL + advertData.user.avatar}
                alt="user_avatar"
                className={styles.avatarImg}
              />
            </Col>
            <Col className="mt-2">
              <small>{advertData.user.login}</small>
            </Col>
            <Col>
              <small>{advertData.user.phone}</small>
            </Col>
          </Row>
          {userLogged && userLogged.user._id === advertData.user._id ? (
            <Row>
              <Col className="text-end">
                <Link className="mx-1" to={`/edit/${advertId}`}>
                  <Button color="warm-main" content="edit" />
                </Link>
                <Button
                  onClick={handleDelete}
                  color="warm-main"
                  content="delete"
                />
              </Col>
            </Row>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleAdvert;
