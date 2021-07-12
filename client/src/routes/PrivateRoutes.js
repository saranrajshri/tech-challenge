import React, { Suspense, lazy, useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SLUGS from "../resources/slugs";
import LoadingComponent from "../global-components/Loader/Loader";
import { Context } from "../context/Context";

const DashboardComponent = lazy(() => import("../pages/DashBoard/DashBoard"));

function PrivateRoutes() {
  const [state] = useContext(Context);
  const { isLoaderVisible } = state;

  return (
    <Suspense fallback={<LoadingComponent loading />}>
      <LoadingComponent loading={isLoaderVisible} />
      <Switch>
        <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
        <Redirect to={SLUGS.dashboard} />
      </Switch>
    </Suspense>
  );
}

export default PrivateRoutes;
