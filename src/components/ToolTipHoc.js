import React from "react";
import PropTypes from "prop-types";
import withHover from "./WithHover";

const styles = {
  container: {
    position: "relative",
    display: "flex",
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "50%",
    left: "50%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "hsla(0, 0%, 20%, 0.1)",
    padding: "7px",
    marginBottom: "5px",
    color: "#000",
    textAlign: "center",
    fontSize: "14px",
    borderRadius: "3px",
  },
};

function ToolTipHoc({ text, children, hovering }) {
  return (
    <div style={styles.container}>
      {hovering === true && <div style={styles.tooltip}>{text}</div>}
      {children}
    </div>
  );
}

ToolTipHoc.propTypes = {
  text: PropTypes.string.isRequired,
};

export default withHover(ToolTipHoc, "hovering");
