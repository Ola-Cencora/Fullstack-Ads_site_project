import { render } from "@testing-library/react";
import PageTitle from "./PageTitle";

describe("Component PageTitle", () => {
  it("should render without crashing with proper props", () => {
    render(<PageTitle title="test title" />);
  });
});
