import { render } from "@testing-library/react";
import AdvertForm from "./AdvertForm";

describe("Component AdvertForm", () => {
  it("should render without crashing with proper props", () => {
    render(
      <AdvertForm action={() => {}} actionText="submit" isAddAdvert={true} />
    );
  });
});
