import React from "react";
import PropTypes from "prop-types";
import useHover from "../hooks/useHover";

const styles = {
  container: {
    position: "relative",
    display: "flex",
  },
  tooltip: {
    boxSizing: "border-box",
    position: "absolute",
    width: "160px",
    bottom: "60%",
    left: "80%",
    marginLeft: "-80px",
    borderRadius: "3px",
    backgroundColor: "white",
    padding: "7px",
    marginBottom: "5px",
    color: "#000",
    textAlign: "center",
    fontSize: "14px",
    borderRadius: "3px",
  },
};

export default function ToolTip({ text, children }) {
  const [hovering, attrs] = useHover();
  console.log(hovering);
  return (
    <div style={styles.container} {...attrs}>
      {hovering ? <div style={styles.tooltip}>{text} </div> : null}
      {children}
    </div>
  );
}

ToolTip.propTypes = {
  text: PropTypes.string.isRequired,
};
