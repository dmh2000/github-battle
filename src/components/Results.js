import React from "react";
import PropTypes from "prop-types";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
} from "react-icons/fa";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { battle } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import ToolTip from "./ToolTip";
/** Card for a player in battle */
function PlayerCard({ player, result }) {
  return (
    <Card
      header={result}
      subheader={player.score.toLocaleString()}
      avatar={player.profile.avatar_url}
      href={player.profile.html_url}
      name={player.profile.login}
    >
      <ul className="card-list">
        <li>
          <FaUser color="rgb(239,115,115)" size={22} />
          {player.profile.name}
        </li>

        <li>
          <ToolTip text="Player Location>">
            <FaCompass color="rgb(144,115,255)" size={22} />
            {player.profile.location}
          </ToolTip>
        </li>

        <ToolTip text="Player Company">
          <li>
            <FaBriefcase color="#795548" size={22} />
            {player.profile.company}
          </li>
        </ToolTip>

        <ToolTip text="Player Followers">
          <li>
            <FaUser color="rgb(129,195,245)" size={22} />
            {player.profile.followers.toLocaleString()} followers
          </li>
        </ToolTip>

        <li>
          <FaUserFriends color="rgb(64,183,95)" size={22} />
          {player.profile.following.toLocaleString()} following
        </li>
      </ul>
    </Card>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
  result: PropTypes.string.isRequired,
};

/** layout for results of a battle
 * fetch and compute results for two players
 */
export default class Results extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     winner: null,
  //     loser: null,
  //     error: null,
  //     loading: true,
  //   };
  // }

  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search
    );
    console.log(playerOne, playerTwo);
    try {
      battle([playerOne, playerTwo])
        .then((players) => {
          if (!players) {
            throw new Error("One or both player repos not found");
          }
          this.setState({
            winner: players[0],
            loser: players[1],
            error: null,
            loading: false,
          });
        })
        .catch((e) => {
          this.setState({
            winner: null,
            loser: null,
            error: e.message,
            loading: false,
          });
        });
    } catch (e) {
      this.setState({
        winner: null,
        loser: null,
        error: e.message,
        loading: false,
      });
    }
  }
  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading) {
      return <Loading text={"Github Battle!"} />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    const tie = winner.score === loser.score;
    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <PlayerCard player={winner} result={tie ? "Tie" : "Winner"} />
          <PlayerCard player={loser} result={tie ? "Tie" : "Loser"} />
        </div>
        <Link className="btn btn-dark btn-space" to="/battle">
          Reset
        </Link>
      </React.Fragment>
    );
  }
}
