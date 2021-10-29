import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

export const E404 = (props) => {
  console.log(props);
  return (
    <div>
      404 not found : <code>{props.location.pathname}</code>
    </div>
  );
};
