import styles from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = ({ content, color, onClick }) => {
  let buttonColor = "";

  if (color === "warm-cool") {
    buttonColor = styles.buttonWarmCool;
  } else if (color === "cool-main") {
    buttonColor = styles.buttonCoolMain;
  } else if (color === "warm-main") {
    buttonColor = styles.buttonWarmMain;
  }

  return (
    <button className={buttonColor} onClick={onClick}>
      {content}
    </button>
  );
};

Button.propTypes = {
  content: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["warm-cool", "cool-main", "warm-main"]),
  onClick: PropTypes.func,
};

export default Button;
