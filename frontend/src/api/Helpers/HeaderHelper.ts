import { ReduxState } from "../../store";

export function generateAuthenticationHeadder(state: ReduxState) {
  const jwtToken = state.auth.token;

  return {
    Authorization: "Bearer " + jwtToken,
  };
}
