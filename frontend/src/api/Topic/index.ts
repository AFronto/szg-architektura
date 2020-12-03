import axios from "axios";
import TopicData from "../../data/server/Topic/TopicData";
import { AppDispatch, ReduxState } from "../../store";
import { generateAuthenticationHeader } from "../Helpers/HeaderHelper";
import { serverBaseUrl } from "../serverUrl";

export function getTopics() {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "GET",
      url: serverBaseUrl + "topics",
      headers: header,
    }).then();
  };
}

export function createNewTopic(topicData: TopicData) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "POST",
      url: serverBaseUrl + "topics/create",
      headers: header,
      data: topicData,
    }).then();
  };
}

export function deleteTopic(topicData: TopicData) {
  return (dispatch: AppDispatch, getState: () => ReduxState) => {
    const header = generateAuthenticationHeader(getState());

    return axios({
      method: "DELETE",
      url: serverBaseUrl + "topics/" + topicData.id,
      headers: header,
    }).then();
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
      url: serverBaseUrl + "topics/" + id,
      headers: header,
    }).then();
  };
}
