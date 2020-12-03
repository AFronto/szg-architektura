import { ReduxState } from "../../store";

export function generateAuthenticationHeader(state: ReduxState) {
  const jwtToken = state.auth.token;

  return {
    Authorization: "Bearer " + jwtToken,
  };
}
