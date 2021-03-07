import React, { Fragment, Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import FoodSearch from "../src/containers/FoodSearch/FoodSearch";
import Cockpit from "./containers/Cockpit/Cockpit";
import JournalEntries from "./containers/JournalEntries/JournalEntries";
import JournalLog from "./containers/JournalLog/JournalLog";
import UserInfo from "./containers/UserInfo/UserInfo";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route
            path="/food-journal"
            render={() => (
              <Fragment>
                <Cockpit />
                <FoodSearch />
                <JournalEntries />
              </Fragment>
            )}
          />
          <Route path="/journal-log" component={JournalLog} />
          <Route path="/user-info" component={UserInfo} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/food-journal" />
        </Switch>
      );
    }
    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
