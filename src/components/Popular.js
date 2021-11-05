import React, { useState, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import { fetchPopularRepos } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import ThemeContext from "../context/theme";

const activeStyle = {
  color: "red",
};

/** nav bar */
function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Go", "C", "CPP", "Python"];
  const { theme } = React.useContext(ThemeContext);

  return (
    <ul className="flex-center">
      {languages.map((v) => {
        return (
          <li key={v}>
            <button
              onClick={() => onUpdateLanguage(v)}
              className={
                theme === "light"
                  ? "btn-clear nav-link "
                  : "btn-clear-dark nav-link"
              }
              style={v == selected ? { color: "red" } : null}
            >
              {v}
            </button>
          </li>
        );
      })}
    </ul>
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

function popularReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "success":
      return {
        state,
        [action.selected]: action.repos,
        error: null,
      };
    case "error":
      console.log("error :", action.error.message);
      return {
        state,
        error: action.error.message,
      };
    default:
      throw new Error("bad action in PopularReducer");
  }
}

export default function Popular() {
  const [selected, setSelected] = useState("All");
  const [state, dispatch] = useReducer(popularReducer, { error: null });
  const cacheRef = React.useRef([]);

  useEffect(() => {
    if (!cacheRef.current.includes(selected)) {
      cacheRef.current.push(selected);
      fetchPopularRepos(selected)
        .then((repos) => {
          dispatch({ type: "success", selected, repos });
        })
        .catch(() => {
          dispatch({ type: "error", error: "no repo found" });
        });
    }
  }, [cacheRef, selected]);

  /** change the language */
  const onUpdateLanguage = (selected) => {
    console.log("onUpdate", selected);
    setSelected(selected);
  };

  /**
   * determine if repos are loading without error
   */
  const isLoading = () => {
    console.log(state);
    return !state[selected] && state.error === null;
  };

  return (
    <React.Fragment>
      <LanguagesNav selected={selected} onUpdateLanguage={onUpdateLanguage} />

      {isLoading() && <Loading text={"Fetching Repos"} />}

      {state.error && <p className="center-text error">{state.error}</p>}

      {state[selected] && <ReposGrid repo={state[selected]} />}
    </React.Fragment>
  );
}
