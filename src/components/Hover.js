import React from "react";

/**
 * Hover with 'children' render prop
 */
export default class Hover extends React.Component {
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
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}

/**
 * Hover with 'render' render prop
 */
export class Hover2 extends React.Component {
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
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.render(this.state.hovering)}
      </div>
    );
  }
}
