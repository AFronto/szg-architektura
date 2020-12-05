import axios from "axios";
import TopicData from "../../data/server/Topic/TopicData";
import { AppDispatch, ReduxState } from "../../store";
import { addError } from "../../store/Errors";
import { logOutLocally } from "../Auth";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";
import {
  loadTopics,
  updateTopic,
  removeTopic,
  addTopic,
  updateQuestion,
  removeQuestion,
  updateReply,
  removeReply,
} from "../../store/Topic";
import { push } from "connected-react-router";
import QuestionData from "../../data/server/Topic/QuestionData";
import ReplyData from "../../data/server/Topic/ReplyData";

export function getTopics() {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "GET",
      url: serverBaseUrl + "topics",
      headers: header,
    }).then(
      (success) => {
        if (
          success.data.logedOut !== undefined &&
          success.data.logedOut === true
        ) {
          logOutLocally(dispatch);
        } else {
          dispatch(loadTopics({ topicList: success.data }));
        }
      },
      (error) => {
        dispatch(
          addError({
            name: "getAllTopicsError",
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

export function createNewTopic(topicData: TopicData) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "POST",
      url: serverBaseUrl + "topics",
      headers: header,
      data: topicData,
    }).then(
      (success) => {
        if (
          success.data.logedOut !== undefined &&
          success.data.logedOut === true
        ) {
          logOutLocally(dispatch);
        } else {
          dispatch(
            updateTopic({
              topicId: topicData.id,
              updatedTopic: {
                ...topicData,
                owner: success.data.owner,
                id: success.data.id,
              },
            })
          );
        }
      },
      (error) => {
        dispatch(removeTopic({ topicId: topicData.id }));
        dispatch(
          addError({
            name: "createTopicError",
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

export function deleteTopic(topicData: TopicData) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "DELETE",
      url: serverBaseUrl + "topics/" + topicData.id,
      headers: header,
    }).then(
      (success) => {
        if (
          success.data.logedOut !== undefined &&
          success.data.logedOut === true
        ) {
          logOutLocally(dispatch);
        } else {
          dispatch(push("/topics"));
        }
      },
      (error) => {
        dispatch(addTopic({ newTopic: topicData }));
        dispatch(
          addError({
            name: "deleteTopicError",
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

export function editTopic(newTopicData: TopicData) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "PUT",
      url: serverBaseUrl + "topics/" + newTopicData.id,
      headers: header,
      data: newTopicData,
    }).then();
  };
}

export function getSingleTopic(id: string) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "GET",
      url: serverBaseUrl + "topics",
      headers: header,
    }).then(
      (success_getAll) => {
        if (
          success_getAll.data.logedOut !== undefined &&
          success_getAll.data.logedOut === true
        ) {
          logOutLocally(dispatch);
        } else {
          dispatch(loadTopics({ topicList: success_getAll.data }));
          axios({
            method: "GET",
            url: serverBaseUrl + "topics/" + id,
            headers: header,
          }).then(
            (success) => {
              if (
                success.data.logedOut !== undefined &&
                success.data.logedOut === true
              ) {
                logOutLocally(dispatch);
              } else {
                dispatch(
                  updateTopic({
                    topicId: id,
                    updatedTopic: success.data,
                  })
                );
              }
            },
            (error) => {}
          );
        }
      },
      (error) => {
        dispatch(
          addError({
            name: "getAllTopicsError",
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

export function createNewReply(
  topicId: string,
  questionId: string,
  reply: ReplyData
) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "POST",
      url: `${serverBaseUrl}topics/${topicId}/question/${questionId}/reply`,
      headers: header,
      data: reply,
    }).then(
      (success) => {
        if (
          success.data.logedOut !== undefined &&
          success.data.logedOut === true
        ) {
          logOutLocally(dispatch);
        } else {
          dispatch(
            updateReply({
              parentTopicId: topicId,
              parentQuestionId: questionId,
              replyId: reply.id,
              updatedReply: {
                ...reply,
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
          removeReply({
            parentTopicId: topicId,
            parentQuestionId: questionId,
            replyId: reply.id,
          })
        );
        dispatch(
          addError({
            name: "createReplyError",
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
