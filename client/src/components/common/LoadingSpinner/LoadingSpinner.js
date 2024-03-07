import { Spinner } from "react-bootstrap";

const LoadingSpinner = () => (
  <Spinner animation="border" className="d-flex mx-auto my-5">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

export default LoadingSpinner;
