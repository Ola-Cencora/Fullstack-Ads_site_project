import { Card, Row, Col, Modal } from "react-bootstrap";
import styles from "./SingleAdvert.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { deleteAdvertRequest, getRequests } from "../../../redux/advertsRedux";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { IMGS_URL } from "../../../config";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/usersRedux";
import Button from "../../common/Button/Button";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { API_URL } from "../../../config";

const SingleAdvert = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { advertId } = useParams();

  const [advertData, setAdvert] = useState(null);
  const [advertExists, setAdvertExists] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const requests = useSelector(getRequests);
  const userLogged = useSelector(getUser);

  useEffect(() => {
    const fetchAdvert = async () => {
      try {
        if (advertId) {
          setLoading(true);
          const response = await fetch(`${API_URL}/api/ads/${advertId}`);
          if (response.ok) {
            const advert = await response.json();
            setAdvert(advert);
            setLoading(false);
          } else {
            console.error("Failed to fetch ad");
            setAdvertExists(false);
          }
        } else {
          setAdvertExists(false);
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
        setAdvertExists(false);
      }
    };

    fetchAdvert();
  }, [advertId]);

  if (advertExists === false) {
    return (
      <div className="d-flex justify-content-center vh-100 mt-5">
        <div className="text-center">
          <p>Seems like there is no such advert :(</p>
          <Link to="/">
            <Button color="warm-main" content="back to home page" />
          </Link>
        </div>
      </div>
    );
  }

  if (loading === true) {
    return <LoadingSpinner />;
  }

  if (advertData === null) {
    return <div className="visually-hidden">null</div>;
  }

  const handleDelete = () => {
    dispatch(deleteAdvertRequest(advertId));
    navigate("/");
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const formattedDate = new Date(advertData.date).toLocaleDateString();

  return (
    <>
      <Col md={9} className="mx-auto">
        {requests["app/adverts/DATA_ADVERTS"] &&
          requests["app/adverts/DATA_ADVERTS"].pending && <LoadingSpinner />}
        {requests["app/adverts/DATA_ADVERTS"] &&
          requests["app/adverts/DATA_ADVERTS"].error && (
            <p>Ups... something went wrong :( Try again later</p>
          )}
        {requests["app/adverts/DATA_ADVERTS"] &&
          requests["app/adverts/DATA_ADVERTS"].success && (
            <Card className={styles.card}>
              <Card.Img
                variant="top"
                src={IMGS_URL + advertData.img}
                alt={advertData.title}
                className={styles.card__img}
              />
              <Card.Body>
                <Card.Title>{advertData.title}</Card.Title>
                <Card.Title>{advertData.price} $</Card.Title>
                <Card.Text className="mb-1">{advertData.location}</Card.Text>
                <Card.Text className="text-muted">
                  <small>{formattedDate}</small>
                </Card.Text>
                <Card.Text className="my-4">{advertData.text}</Card.Text>
                <Row className={styles.card__details}>
                  <Col>
                    <img
                      src={IMGS_URL + advertData.user.avatar}
                      alt="user_avatar"
                      className={styles.card__details__img}
                    />
                  </Col>
                  <Col className="mt-2">
                    <small>{advertData.user.login}</small>
                  </Col>
                  <Col>
                    <small>{advertData.user.phone}</small>
                  </Col>
                </Row>
                {(userLogged && userLogged.user._id === advertData.user._id) ||
                (userLogged && userLogged.user.id === advertData.user._id) ? (
                  <Row>
                    <Col className="text-end">
                      <Link className="mx-1" to={`/edit/${advertId}`}>
                        <Button color="warm-main" content="edit" />
                      </Link>
                      <Button
                        onClick={handleShow}
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
          )}
      </Col>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hey!</Modal.Title>
        </Modal.Header>
        <Modal.Body> Are you sure you want to delete this advert?</Modal.Body>
        <Modal.Footer>
          <Button color="warm-main" onClick={handleDelete} content="delete" />
          <Button color="cool-main" onClick={handleClose} content="nope" />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingleAdvert;
