import React from "react";
import PropTypes from "prop-types";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeConsumer } from "../context/theme";

/**
 * render the instructions for battle
 */
function Instructions() {
  return (
    <ThemeConsumer>
      {({ theme }) => {
        return (
          <div className="instructions-container">
            <h1 className="center-text header-lg">Instructions</h1>
            <ol className="container-sm grid center-text battle-instructions">
              <li>
                <h3 className="header-sm">Enter Two Github Users</h3>
                <FaUserFriends
                  className={`bg-${theme}`}
                  color="rgb(255,191,116)"
                  size={140}
                  style={{ padding: 40 }}
                />
              </li>
              <li>
                <h3 className="header-sm">Battle</h3>
                <FaFighterJet
                  className={`bg-${theme}`}
                  color="#727272"
                  size={140}
                  style={{ padding: 40 }}
                />
              </li>
              <li>
                <h3 className="header-sm">See the winners</h3>
                <FaTrophy
                  className={`bg-${theme}`}
                  color="rgb(255,215,0)"
                  size={140}
                  style={{ padding: 40 }}
                />
              </li>
            </ol>
          </div>
        );
      }}
    </ThemeConsumer>
  );
}

/**
 * get player username using a controlled component
 * callback to the parent when submitted
 */
class PlayerInput extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: "",
  //   };
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  // }
  state = {
    username: "",
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  };

  handleChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => {
          return (
            <form className="column player" onSubmit={this.handleSubmit}>
              <label htmlFor="username" className="player-label">
                {this.props.label}
              </label>
              <div className="row player-inputs">
                <input
                  type="text"
                  id="username"
                  className={`input=${theme}`}
                  placeholder="github username"
                  autoComplete="off"
                  value={this.state.username}
                  onChange={this.handleChange}
                ></input>
                <button
                  className={`btn btn-${theme}`}
                  type="submit"
                  disabled={!this.state.username}
                >
                  Submit
                </button>
              </div>
            </form>
          );
        }}
      </ThemeConsumer>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

/**
 *  show the selected player and avatar
 */
function PlayerPreview({ username, onReset, label }) {
  return (
    <ThemeConsumer>
      {({ theme }) => {
        return (
          <div className="column player">
            <h3 className="player-label>">{label}</h3>
            <div className={`row bg-${theme}`}>
              <div className="player-info">
                <img
                  className="avatar-small"
                  src={`https://github.com/${username}.png?size=200`}
                  alt={`avatar for ${username}`}
                />
                <a href={`https://github.com/${username}`} className="link">
                  {username}
                </a>
              </div>
              <button className="btn-clear flex-center" onClick={onReset}>
                <FaTimesCircle color="rgb(1924,57,42)" size={26} />
              </button>
            </div>
          </div>
        );
      }}
    </ThemeConsumer>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

/**
 * render the battle component
 */
export default class Battle extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     playerOne: null,
  //     playerTwo: null,
  //   };

  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.handleReset = this.handleReset.bind(this);
  // }
  state = {
    playerOne: null,
    playerTwo: null,
  };

  /** callback for player input submit */
  handleSubmit = (id, player) => {
    this.setState({
      [id]: player,
    });
  };

  /** reset one of the players */
  handleReset = (id) => {
    this.setState({
      [id]: null,
    });
  };

  render() {
    /** destructure the current state */
    const { playerOne, playerTwo } = this.state;

    /** show player input if one or both players are not yet set */
    return (
      <React.Fragment>
        <Instructions />

        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {/* show input or preview for player one*/}
            {playerOne === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={(playerOne) =>
                  this.handleSubmit("playerOne", playerOne)
                }
              />
            ) : (
              <PlayerPreview
                username={playerOne}
                onReset={() => {
                  this.handleReset("playerOne");
                }}
                label="PlayerOne"
              />
            )}

            {/* show input or preview for player two*/}
            {playerTwo === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={(playerTwo) =>
                  this.handleSubmit("playerTwo", playerTwo)
                }
              />
            ) : (
              <PlayerPreview
                username={playerTwo}
                onReset={() => {
                  this.handleReset("playerTwo");
                }}
                label="PlayerTwo"
              />
            )}
          </div>
          {/* if both players are selected show the battle button */}
          {playerOne && playerTwo && (
            <Link
              className="btn btn-dark btn-space"
              to={{
                pathname: "/battle/results",
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
              }}
            >
              Battle
            </Link>
          )}
        </div>
      </React.Fragment>
    );
  }
}
