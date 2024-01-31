import { searchAdvert } from "../../../redux/searchAdvertsRedux";
import { useSelector } from "react-redux";
import AdvertSummary from "../../common/AdvertSummary/AdvertSummary";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import NotFound from "../NotFound/NotFound";

const SearchResults = () => {
  const { searchPhrase } = useParams();
  const advertsData = useSelector((state) => searchAdvert(state, searchPhrase));
  const sortedAdverts = [...advertsData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  if (advertsData.length === 0) return <NotFound />;

  return (
    <Row>
      {sortedAdverts.map((advert) => (
        <AdvertSummary
          key={advert._id}
          id={advert._id}
          title={advert.title}
          location={advert.location}
          price={advert.price}
          img={advert.img}
        />
      ))}
    </Row>
  );
};

export default SearchResults;
