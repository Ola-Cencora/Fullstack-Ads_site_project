import AdvertForm from "../../features/AdvertForm/AdvertForm";
import { addAdvertRequest } from "../../../redux/advertsRedux";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";
import { useState } from "react";
import { Alert, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import PageTitle from "../../common/PageTitle/PageTitle";

const AddAdvert = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogged = useSelector(getUser);
  const [status, setStatus] = useState(null);

  const handleSubmit = (advert) => {
    advert.date = new Date();
    advert.user = userLogged.user.id;
    dispatch(addAdvertRequest(advert))
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

  if (!userLogged) return <Navigate to="/" />;

  return (
    <>
      <PageTitle title="Let's add a new advert!" />
      <Col sm={12} lg={6} xl={4} className="mx-auto">
        {status === "success" && (
          <Alert variant="success">
            <Alert.Heading>Success!</Alert.Heading>
            <p>Now everyone can see your advert :)</p>
          </Alert>
        )}
        {status === "error" && (
          <Alert variant="danger">
            <Alert.Heading>Something went wrong...</Alert.Heading>
            <p>Unexpected error, try again!</p>
          </Alert>
        )}
      </Col>
      <AdvertForm
        action={handleSubmit}
        actionText="add an advert"
        isAddAdvert={true}
      />
    </>
  );
};

export default AddAdvert;
