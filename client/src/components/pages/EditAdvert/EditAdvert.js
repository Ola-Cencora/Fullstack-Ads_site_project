import AdvertForm from "../../features/AdvertForm/AdvertForm";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { getAdvertById, editAdvertRequest } from "../../../redux/advertsRedux";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Alert, Col } from "react-bootstrap";
import { getUser } from "../../../redux/usersRedux";

const EditAdvert = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);

  const { advertId } = useParams();
  const advertData = useSelector((state) => getAdvertById(state, advertId));
  const userLogged = useSelector(getUser);
  console.log("advertData", advertData, "userLogged", userLogged);

  const handleSubmit = (advert) => {
    advert.id = advertData._id;
    advert.user = advertData.user._id;
    dispatch(editAdvertRequest(advert))
      .then(() => {
        setStatus("success");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => {
        setStatus("error");
      });
  };

  if (!userLogged || !advertData || userLogged.user.id !== advertData.user._id)
    return <Navigate to="/" />;

  return (
    <div>
      <h3 className="my-5 text-center">Let's edit this advert!</h3>
      <Col sm={12} lg={6} xl={4} className="mx-auto">
        {status === "success" && (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>Now everyone can see your edited advert :)</p>
          </Alert>
        )}
        {status === "error" && (
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error, try again!</p>
          </Alert>
        )}
      </Col>
      <AdvertForm action={handleSubmit} actionText="done" {...advertData} />
    </div>
  );
};

export default EditAdvert;
