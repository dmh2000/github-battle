import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import ThemeContext from "./context/theme";
import Nav from "./components/Nav";
import { E404 } from "./components/Errors";
import Loading from "./components/Loading";

const Popular = React.lazy(() => import("./components/Popular"));
const Battle = React.lazy(() => import("./components/Battle"));
const Results = React.lazy(() => import("./components/Results"));

function App(props) {
  const [themeData, setThemeData] = React.useState({
    theme: "dark",
    toggleTheme,
  });
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    setThemeData({
      theme: themeData.theme === "light" ? "dark" : "light",
      toggleTheme,
    });
  }, [update]);

  function toggleTheme() {
    setUpdate((update) => !update);
  }

  return (
    <Router>
      <ThemeContext.Provider value={themeData}>
        <div className={themeData.theme}>
          <div className="container">
            <Nav />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route component={E404} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </Router>
  );
}

ReactDOM.render(
  // react element
  <App />,
  // where to render
  document.getElementById("app")
);
