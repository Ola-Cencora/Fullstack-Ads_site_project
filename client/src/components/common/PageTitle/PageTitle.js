import PropTypes from "prop-types";

const PageTitle = ({ title }) => <h3 className="my-5 text-center">{title}</h3>;

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
