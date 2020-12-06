import axios from "axios";
import DeadlineData from "../../data/server/Topic/DeadlineData";
import { AppDispatch, ReduxState } from "../../store";
import { addError } from "../../store/Errors";
import { removeDeadline, updateDeadline } from "../../store/Topic";
import { logOutLocally } from "../Auth";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";

export function createNewDeadline(topicId: string, deadline: DeadlineData) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "POST",
      url: `${serverBaseUrl}topics/${topicId}/deadline`,
      headers: header,
      data: deadline,
    }).then(
      (success) => {
        if (
          success.data.logedOut !== undefined &&
          success.data.logedOut === true
        ) {
          logOutLocally(dispatch);
        } else {
          dispatch(
            updateDeadline({
              parentTopicId: topicId,
              deadlineId: deadline.id,
              updatedDeadline: { ...deadline, id: success.data.id },
            })
          );
        }
      },
      (error) => {
        dispatch(
          removeDeadline({
            parentTopicId: topicId,
            deadlineId: deadline.id,
          })
        );
        dispatch(
          addError({
            name: "createDeadlineError",
            description: error.response.data,
          })
        );
        if (error.response.status === 401) {
          logOutLocally(dispatch);
        }
      }
    );
  };
}

export function updateExistingDeadline(
  topicId: string,
  oldDeadLine: DeadlineData,
  deadline: DeadlineData
) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "PUT",
      url: `${serverBaseUrl}topics/${topicId}/deadline`,
      headers: header,
      data: deadline,
    }).then(
      (success) => {
        if (
          success.data.logedOut !== undefined &&
          success.data.logedOut === true
        ) {
          logOutLocally(dispatch);
        }
      },
      (error) => {
        dispatch(
          updateDeadline({
            parentTopicId: topicId,
            deadlineId: deadline.id,
            updatedDeadline: oldDeadLine,
          })
        );
        dispatch(
          addError({
            name: "updateDeadlineError",
            description: error.response.data,
          })
        );
        if (error.response.status === 401) {
          logOutLocally(dispatch);
        }
      }
    );
  };
}
