import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./context/theme";
import Nav from "./components/Nav";
import { E404 } from "./components/Errors";
import DynamicImport from "./components/DynamicImport";
import Loading from "./components/Loading";

const Popular = React.lazy(() => import("./components/Popular"));
const Battle = React.lazy(() => import("./components/Battle"));
const Results = React.lazy(() => import("./components/Results"));

class App extends React.Component {
  //state
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light",
        }));
      },
    };
  }

  // lifecycle

  // UI as JSX
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
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
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(
  // react element
  <App />,
  // where to render
  document.getElementById("app")
);
