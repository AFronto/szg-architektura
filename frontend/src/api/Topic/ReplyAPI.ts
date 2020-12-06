import ReplyData from "../../data/server/Topic/ReplyData";
import { AppDispatch, ReduxState } from "../../store";
import axios from "axios";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";
import { logOutLocally } from "../Auth";
import { removeReply, updateReply } from "../../store/Topic";
import { addError } from "../../store/Errors";

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
