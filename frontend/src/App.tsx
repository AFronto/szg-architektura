import * as React from "react";
import "./App.css";
import Layout from "./components/Navigation/Layout";
import { NavMenu } from "./components/Navigation/NavMenu";
import { AuthenticatedRoute } from "./routing/AuthenticatedRoute";
import { Route } from "react-router";
import { LogInScreen } from "./components/Auth/LogIn";
import { RegisterScreen } from "./components/Auth/Register";
import { TopicsScreen } from "./components/Topics";

export default () => {
  return (
    <div style={{ height: "100%" }}>
      <NavMenu />
      <Layout>
        <Route path="/login" component={LogInScreen} />
        <Route path="/register" component={RegisterScreen} />
        <AuthenticatedRoute exact path="/">
          <TopicsScreen />
        </AuthenticatedRoute>
        <AuthenticatedRoute exact path="/topics">
          <TopicsScreen />
        </AuthenticatedRoute>
      </Layout>
    </div>
  );
};
