import React, { Component } from "react";

// example
// const Topics = (props) => {
//   return (
//     <DynamicImport load={() => import("./Topics")}>
//       {(Component) =>
//         Component === null ? <h1>Loading!</h1> : <Component {...props} />
//       }
//     </DynamicImport>
//   );
// };

export default class DynamicImport extends Component {
  state = {
    component: null,
  };

  componentDidMount() {
    this.props.load().then((mod) =>
      this.setState(() => ({
        component: mod.default,
      }))
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.component === null ? (
          <h1>Loading</h1>
        ) : (
          this.props.children(this.state.component)
        )}
      </React.Fragment>
    );
  }
}
