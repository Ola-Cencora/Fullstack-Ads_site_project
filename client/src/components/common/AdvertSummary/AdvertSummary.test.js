import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdvertSummary from "./AdvertSummary";

describe("Component AdvertSummary", () => {
  const advert = {
    id: "1",
    title: "Test Advert",
    location: "Test Location",
    price: 100,
    img: "test-image.jpg",
  };

  it("should render without crashing with proper props", () => {
    render(
      <MemoryRouter>
        <AdvertSummary
          id={advert.id}
          title={advert.title}
          location={advert.location}
          price={advert.price}
          img={advert.img}
        />
      </MemoryRouter>
    );
  });
});
