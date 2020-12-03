import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { registerForRefreshingTokens } from "../../api/Auth";

export const DetailedTopicScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  dispatch(registerForRefreshingTokens());
  var { id } = useParams();

  return (
    <>
      <h1>name</h1>
      <h1>description</h1>
      <h1>questions</h1>
    </>
  );
};
