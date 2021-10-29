import React from "react";
import PropTypes from "prop-types";

/**
 * style it locally
 */
const styles = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
  },
};

/**
 * Loading indicator
 */
export default class Loading extends React.Component {
  state = {
    content: this.props.text,
  };
  /**
   * set up interval to add animatino
   */
  componentDidMount() {
    const { text, speed } = this.props;
    this.interval = window.setInterval(() => {
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, speed);
  }

  /**
   * clear the interval
   */
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <p style={styles.content}>{this.state.content}</p>;
  }
}

/**
 * defaults
 */
Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};

/**
 * proptypes
 */
Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};
