import React from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
  FaRegFile,
  FaBlackberry,
} from "react-icons/fa";
import { fetchPopularRepos } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import { ThemeConsumer } from "../context/theme";

/** nav bar */
function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Go", "C", "CPP", "Python"];
  return (
    <ThemeConsumer>
      {({ theme }) => {
        return (
          <ul className="flex-center">
            {languages.map((v) => {
              return (
                <li key={v}>
                  <button
                    onClick={() => onUpdateLanguage(v)}
                    className="btn-clear nav-link "
                    style={v == selected ? { color: "red" } : null}
                  >
                    {v}
                  </button>
                </li>
              );
            })}
          </ul>
        );
      }}
    </ThemeConsumer>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

/**
 * render the repo cards
 */
function ReposGrid({ repo }) {
  return (
    <ul className="grid space-around">
      {repo.map((v, i) => {
        const { html_url, stargazers_count, forks, open_issues, owner } = v;
        const { login, avatar_url } = owner;

        return (
          <Card
            header={`#${i + 1}`}
            avatar={avatar_url}
            href={html_url}
            name={login}
            key={html_url}
          >
            <ul className="card-list">
              <li>
                <FaUser color="rgb(244,191,116)" size={22} />
                <a href={`https://github.com/${login}`}>{login}</a>
              </li>
              <li>
                <FaStar color="rgb(255,216,0)" size={22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color="rgb(129,195,245)" size={22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color="rgb(241,138,147)" size={22} />
                {open_issues.toLocaleString()} open issues
              </li>
            </ul>
          </Card>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repo: PropTypes.array.isRequired,
};

/**
 * Show Popular Repos for specified languages
 * USES CLASS FIELDS
 */
export default class Popular extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     selected: "All",
  //     repos: {},
  //     error: null,
  //   };
  // }

  state = {
    selected: "All",
    repos: {},
    error: null,
  };

  componentDidMount() {
    this.updateLanguage(this.state.selected);
  }

  /** change the language */
  updateLanguage = (selected) => {
    this.setState({
      selected,
      error: null,
    });

    if (!this.state.repos[selected]) {
      fetchPopularRepos(selected)
        .then((data) =>
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selected]: data,
            },
            error: null,
          }))
        )
        .catch(() => {
          console.warn("Error fetching repos: ", this.state.error);
          this.setState({
            error: "error fetching repositories",
          });
        });
    }
  };

  /**
   * determine if repos are loading without error
   */
  isLoading = () => {
    const { selected, repos, error } = this.state;
    return !repos[selected] && error === null;
  };

  render() {
    const { selected, error, repos } = this.state;
    const onUpdateLanguage = this.updateLanguage;
    return (
      <React.Fragment>
        <LanguagesNav selected={selected} onUpdateLanguage={onUpdateLanguage} />
        {this.isLoading() && <Loading text={"Fetching Repos"} />}
        {error && <p className="center-text error">{error}</p>}

        {repos[selected] && <ReposGrid repo={repos[selected]} />}
      </React.Fragment>
    );
  }
}
