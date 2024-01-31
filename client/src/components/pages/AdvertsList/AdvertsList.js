import SearchForm from "../../features/SearchForm/SearchForm";
import AdvertSummary from "../../common/AdvertSummary/AdvertSummary";
import { getAllAdverts } from "../../../redux/advertsRedux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Row } from "react-bootstrap";

const AdvertsList = () => {
  const adverts = useSelector(getAllAdverts);
  const sortedAdverts = [...adverts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <SearchForm />
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
    </>
  );
};

export default AdvertsList;
