import { createSlice } from "@reduxjs/toolkit";
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

    //Question Actions
    addQuestion(state, action) {
      console.log(action.payload.parentTopicId);
      console.log("hello");
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      state[topicIndex].questions.push(action.payload.newQuestion);
      return state;
    },
    updateQuestion(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      var questionToUpdateIndex = state[topicIndex].questions.findIndex(
        (question) => question.id === action.payload.questionId
      );
      if (questionToUpdateIndex !== -1) {
        state[topicIndex].questions[questionToUpdateIndex] =
          action.payload.updatedQuestion;
      }
      return state;
    },
    removeQuestion(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      var questionToDeleteIndex = state[topicIndex].questions.findIndex(
        (question) => question.id === action.payload.questionId
      );
      if (questionToDeleteIndex !== -1) {
        state[topicIndex].questions.splice(questionToDeleteIndex, 1);
      }
      return state;
    },

    //Reply Actions
    addReply(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      var questionIndex = state[topicIndex].questions.findIndex(
        (question) => question.id === action.payload.parentQuestionId
      );
      state[topicIndex].questions[questionIndex].replies.push(
        action.payload.newReply
      );
      return state;
    },
    updateReply(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      var questionIndex = state[topicIndex].questions.findIndex(
        (question) => question.id === action.payload.parentQuestionId
      );
      var replyToUpdateIndex = state[topicIndex].questions[
        questionIndex
      ].replies.findIndex((reply) => reply.id === action.payload.replyId);
      if (replyToUpdateIndex !== -1) {
        state[topicIndex].questions[questionIndex].replies[replyToUpdateIndex] =
          action.payload.updatedReply;
      }
      return state;
    },
    removeReply(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      var questionIndex = state[topicIndex].questions.findIndex(
        (question) => question.id === action.payload.parentQuestionId
      );
      var replyToDeleteIndex = state[topicIndex].questions[
        questionIndex
      ].replies.findIndex((reply) => reply.id === action.payload.replyId);
      if (replyToDeleteIndex !== -1) {
        state[topicIndex].questions[questionIndex].replies.splice(
          replyToDeleteIndex,
          1
        );
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

  //Question Actions
  addQuestion,
  updateQuestion,
  removeQuestion,

  //Reply Actions
  addReply,
  updateReply,
  removeReply,
} = topicsSlice.actions;

export default topicsSlice.reducer;
