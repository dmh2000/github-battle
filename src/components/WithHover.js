import React from "react";

/**
 *
 * @param {'*'} Component to be wrapped
 * @param {*} propName name of prop that will be sent back for indicating hovering or not
 * @returns a new class wrapping the input component with the added hovering prop
 */
export default function withHover(Component, propName = "hovering") {
  return class WithHover extends React.Component {
    // constructor(props) {
    //   super(props);

    //   this.state = {
    //     hovering: false,
    //   };
    //   this.mouseOut = this.mouseOut.bind(this);
    //   this.mouseOver = this.mouseOver.bind(this);
    // }

    state = {
      hovering: false,
    };

    mouseOver = () => {
      this.setState({
        hovering: true,
      });
    };

    mouseOut = () => {
      this.setState({
        hovering: false,
      });
    };

    render() {
      // use the propName specified by the enclosed component for hovering
      const props = {
        [propName]: this.state.hovering,
        ...this.props,
      };
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      );
    }
  };
}
