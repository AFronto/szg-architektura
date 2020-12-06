import axios from "axios";
import ConsultationData from "../../data/server/Topic/ConsultationData";
import { AppDispatch, ReduxState } from "../../store";
import { addError } from "../../store/Errors";
import {
  addConsultation,
  removeConsultation,
  updateConsultation,
} from "../../store/Topic";
import { logOutLocally } from "../Auth";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";

export function createNewConsultation(
  topicId: string,
  consultation: ConsultationData
) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "POST",
      url: `${serverBaseUrl}topics/${topicId}/consultation`,
      headers: header,
      data: consultation,
    }).then(
      (success) => {
        if (
          success.data.logedOut !== undefined &&
          success.data.logedOut === true
        ) {
          logOutLocally(dispatch);
        } else {
          dispatch(
            updateConsultation({
              parentTopicId: topicId,
              updatedConsultation: { ...consultation, id: success.data.id },
            })
          );
        }
      },
      (error) => {
        dispatch(removeConsultation({ parentTopicId: topicId }));
        dispatch(
          addError({
            name: "createConsultationError",
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

export function updateExistingConsultation(
  topicId: string,
  oldConsultation: ConsultationData,
  consultation: ConsultationData
) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "PUT",
      url: `${serverBaseUrl}topics/${topicId}/consultation`,
      headers: header,
      data: consultation,
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
          updateConsultation({
            parentTopicId: topicId,
            updatedDeadline: oldConsultation,
          })
        );
        dispatch(
          addError({
            name: "updateConsultationError",
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

export function deleteConsultation(
  topicId: string,
  consultation: ConsultationData
) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "DELETE",
      url: `${serverBaseUrl}topics/${topicId}/consultation/${consultation.id}`,
      headers: header,
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
          addConsultation({
            parentTopicId: topicId,
            newConsultation: consultation,
          })
        );
        dispatch(
          addError({
            name: "createConsultationError",
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
