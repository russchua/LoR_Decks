import React from "react";

// Routing
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";

// Redux
import { Provider } from "react-redux";
import Store from "./store";

// Views
import MainPage from "./views/MainPage";
import UserPage from "./views/UserPage";
import Header from "./components/Header/Header";

const history = createBrowserHistory();

function App() {
  return (
    <Provider store={Store}>
      <Router history={history}>
        <>
          <Header history={history} />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/user" component={UserPage} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
