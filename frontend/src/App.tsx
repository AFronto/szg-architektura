import * as React from "react";
import "./App.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Layout from "./components/Navigation/Layout";
import { NavMenu } from "./components/Navigation/NavMenu";
import { AuthenticatedRoute } from "./routing/AuthenticatedRoute";
import { Route } from "react-router";
import { LogInScreen } from "./components/Auth/LogIn";
import { RegisterScreen } from "./components/Auth/Register";
import { TopicsScreen } from "./components/Topics";
import { DetailedTopicScreen } from "./components/Topics/DetailedTopic";

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
        <AuthenticatedRoute exact path="/topics/:id">
          <DetailedTopicScreen />
        </AuthenticatedRoute>
      </Layout>
    </div>
  );
};
