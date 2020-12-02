import React, { FunctionComponent } from "react";
import { isLoggedIn } from "../../api/Auth";
import { Redirect } from "react-router";

export const RegisterScreen: FunctionComponent = () => {
  return isLoggedIn() ? (
    <Redirect
      to={{
        pathname: "/topics",
      }}
    />
  ) : (
    <h1>Register</h1>
  );
};
