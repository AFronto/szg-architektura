import axios from "axios";
import QuestionData from "../../data/server/Topic/QuestionData";
import { AppDispatch, ReduxState } from "../../store";
import { addError } from "../../store/Errors";
import { removeQuestion, updateQuestion } from "../../store/Topic";
import { logOutLocally } from "../Auth";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";

export function createNewQuestion(topicId: string, question: QuestionData) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "POST",
      url: `${serverBaseUrl}topics/${topicId}/question`,
      headers: header,
      data: question,
    }).then(
      (success) => {
        if (
          success.data.logedOut !== undefined &&
          success.data.logedOut === true
        ) {
          logOutLocally(dispatch);
        } else {
          dispatch(
            updateQuestion({
              parentTopicId: topicId,
              questionId: question.id,
              updatedQuestion: {
                ...question,
                owner: success.data.owner,
                id: success.data.id,
                creationDate: success.data.creationDate,
              },
            })
          );
        }
      },
      (error) => {
        dispatch(
          removeQuestion({ parentTopicId: topicId, questionId: question.id })
        );
        dispatch(
          addError({
            name: "createQuestionError",
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

export function updateExistingQuestion(
  topicId: string,
  oldQuestion: QuestionData,
  question: QuestionData
) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "PUT",
      url: `${serverBaseUrl}topics/${topicId}/question`,
      headers: header,
      data: question,
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
          updateQuestion({
            parentTopicId: topicId,
            questionId: question.id,
            updatedQuestion: oldQuestion,
          })
        );
        dispatch(
          addError({
            name: "updateQuestionError",
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
