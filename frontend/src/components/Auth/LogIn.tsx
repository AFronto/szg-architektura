import React, { FunctionComponent } from "react";
import { Redirect } from "react-router";
import { isLoggedIn } from "../../api/Auth";

export const LogInScreen: FunctionComponent = () => {
  return isLoggedIn() ? (
    <Redirect
      to={{
        pathname: "/topics",
      }}
    />
  ) : (
    <h1>LogIn</h1>
  );
};
