import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SLUGS from "../resources/slugs";
import Login from "../pages/Login/Login";

function PublicRoutes() {
  return (
    <Switch>
      <Route path={SLUGS.login} component={() => <Login />} />
      {/* <Route path={SLUGS.terms} component={() => <TermsAndConditions />} /> */}
      {/* <Route path={SLUGS.signup} render={() => <div>signup</div>} /> */}
      {/* <Redirect to={SLUGS.login} /> */}
    </Switch>
  );
}

export default PublicRoutes;
