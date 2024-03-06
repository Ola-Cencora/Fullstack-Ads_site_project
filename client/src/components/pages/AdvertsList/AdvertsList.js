import SearchForm from "../../features/SearchForm/SearchForm";
import AdvertSummary from "../../common/AdvertSummary/AdvertSummary";
import {
  getAllAdverts,
  fetchAdverts,
  getRequests,
} from "../../../redux/advertsRedux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const AdvertsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdverts());
  }, [dispatch]);

  const requests = useSelector(getRequests);
  const adverts = useSelector(getAllAdverts);
  const sortedAdverts = [...adverts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <SearchForm />
      {requests["app/adverts/DATA_ADVERTS"] &&
        requests["app/adverts/DATA_ADVERTS"].pending && (
          <Spinner animation="border" className="d-flex mx-auto my-5">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      {requests["app/adverts/DATA_ADVERTS"] &&
        requests["app/adverts/DATA_ADVERTS"].error && (
          <p>Ups... something went wrong :( Try again later</p>
        )}
      {requests["app/adverts/DATA_ADVERTS"] &&
        requests["app/adverts/DATA_ADVERTS"].success && (
          <Row>
            {sortedAdverts.map(({ _id, title, location, price, img }) => (
              <AdvertSummary
                key={_id}
                id={_id}
                title={title}
                location={location}
                price={price}
                img={img}
              />
            ))}
          </Row>
        )}
    </>
  );
};

export default AdvertsList;
