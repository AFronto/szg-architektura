import { createSlice } from "@reduxjs/toolkit";
import QuestionData from "../../data/server/Topic/QuestionData";
import ReplyData from "../../data/server/Topic/ReplyData";
import TopicData from "../../data/server/Topic/TopicData";

const topicsSlice = createSlice({
  name: "topics",
  initialState: [] as TopicData[],
  reducers: {
    loadTopics(_state, action) {
      return action.payload.topicList;
    },
    addTopic(state, action) {
      state.push(action.payload.newTopic);
      return state;
    },
    updateTopic(state, action) {
      var topicToUpdateIndex = state.findIndex(
        (topic) => topic.id === action.payload.topicId
      );
      if (topicToUpdateIndex !== -1) {
        state[topicToUpdateIndex] = action.payload.updatedTopic;
      }
      return state;
    },
    removeTopic(state, action) {
      var topicToDeleteIndex = state.findIndex(
        (topic) => topic.id === action.payload.topicId
      );
      if (topicToDeleteIndex !== -1) {
        state.splice(topicToDeleteIndex, 1);
      }
      return state;
    },
  },
});

const questionsSlice = createSlice({
  name: "questions",
  initialState: [] as QuestionData[],
  reducers: {
    loadQuestions(_state, action) {
      return action.payload.questionList;
    },
    addQuestion(state, action) {
      state.push(action.payload.newQuestion);
      return state;
    },
    updateQuestion(state, action) {
      var questionToUpdateIndex = state.findIndex(
        (question) => question.id === action.payload.questionId
      );
      if (questionToUpdateIndex !== -1) {
        state[questionToUpdateIndex] = action.payload.updatedQuestion;
      }
      return state;
    },
    removeQuestion(state, action) {
      var questionToDeleteIndex = state.findIndex(
        (question) => question.id === action.payload.questionId
      );
      if (questionToDeleteIndex !== -1) {
        state.splice(questionToDeleteIndex, 1);
      }
      return state;
    },
  },
});

const repliesSlice = createSlice({
  name: "replies",
  initialState: [] as ReplyData[],
  reducers: {
    loadReplies(_state, action) {
      return action.payload.replyList;
    },
    addReply(state, action) {
      state.push(action.payload.newReply);
      return state;
    },
    updateReply(state, action) {
      var replyToUpdateIndex = state.findIndex(
        (reply) => reply.id === action.payload.replyId
      );
      if (replyToUpdateIndex !== -1) {
        state[replyToUpdateIndex] = action.payload.updatedReply;
      }
      return state;
    },
    removeReply(state, action) {
      var replyToDeleteIndex = state.findIndex(
        (reply) => reply.id === action.payload.replyId
      );
      if (replyToDeleteIndex !== -1) {
        state.splice(replyToDeleteIndex, 1);
      }
      return state;
    },
  },
});

export const {
  loadTopics,
  addTopic,
  updateTopic,
  removeTopic,
} = topicsSlice.actions;

export const {
  loadQuestions,
  addQuestion,
  updateQuestion,
  removeQuestion,
} = questionsSlice.actions;

export const {
  loadReplies,
  addReply,
  updateReply,
  removeReply,
} = repliesSlice.actions;

export default topicsSlice.reducer;
