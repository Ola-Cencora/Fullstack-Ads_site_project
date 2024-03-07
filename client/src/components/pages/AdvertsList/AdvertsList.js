import SearchForm from "../../features/SearchForm/SearchForm";
import AdvertSummary from "../../common/AdvertSummary/AdvertSummary";
import { getAllAdverts, getRequests } from "../../../redux/advertsRedux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Row } from "react-bootstrap";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

const AdvertsList = () => {
  const requests = useSelector(getRequests);
  const adverts = useSelector(getAllAdverts);
  const sortedAdverts = [...adverts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <>
      <SearchForm />
      {requests["app/adverts/DATA_ADVERTS"] &&
        requests["app/adverts/DATA_ADVERTS"].pending && <LoadingSpinner />}
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
