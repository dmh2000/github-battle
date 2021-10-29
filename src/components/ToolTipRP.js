import React from "react";
import PropTypes from "prop-types";
import Hover, { Hover2 } from "./Hover";

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

/**
 * Using RenderProp with 'children'
 */
export default function ToolTipRP({ text, children }) {
  // Hover treats children as a function and calls it
  return (
    <Hover>
      {(hovering) => (
        <div style={styles.container}>
          {hovering === true && <div style={styles.tooltip}>{text}</div>}
          {children}
        </div>
      )}
    </Hover>
  );
}

/**
 * Using Render Prop with 'render'
 */
export function ToolTipRP2({ text, children }) {
  // Hover2 is passed a function prop 'render' and calls it
  return (
    <Hover2
      render={(hovering) => {
        return (
          <div style={styles.container}>
            {hovering === true && <div style={styles.tooltip}>{text}</div>}
            {children}
          </div>
        );
      }}
    />
  );
}
