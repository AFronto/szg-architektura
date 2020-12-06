import { createSlice } from "@reduxjs/toolkit";
import ConsultationData from "../../data/server/Topic/ConsultationData";
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
      if (state[topicIndex].consultation.length > 0) {
        var consultationQuestionToUpdateIndex = state[
          topicIndex
        ].consultation[0].questions.findIndex(
          (question) => question.id === action.payload.questionId
        );
        if (consultationQuestionToUpdateIndex !== -1) {
          state[topicIndex].consultation[0].questions[
            consultationQuestionToUpdateIndex
          ] = action.payload.updatedQuestion;
        }
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

    //Deadline Actions
    addDeadline(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      state[topicIndex].deadlines.push(action.payload.newDeadline);
      return state;
    },
    updateDeadline(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      var deadlineToUpdateIndex = state[topicIndex].deadlines.findIndex(
        (deadline) => deadline.id === action.payload.deadlineId
      );
      if (deadlineToUpdateIndex !== -1) {
        state[topicIndex].deadlines[deadlineToUpdateIndex] =
          action.payload.updatedDeadline;
      }
      return state;
    },
    removeDeadline(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      var deadlineToDeleteIndex = state[topicIndex].deadlines.findIndex(
        (deadline) => deadline.id === action.payload.deadlineId
      );
      if (deadlineToDeleteIndex !== -1) {
        state[topicIndex].deadlines.splice(deadlineToDeleteIndex, 1);
      }
      return state;
    },

    //Consultation Actions
    addConsultation(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      state[topicIndex].consultation.push(action.payload.newConsultation);
      return state;
    },
    updateConsultation(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      state[topicIndex].consultation[0] = action.payload.updatedConsultation;

      return state;
    },
    removeConsultation(state, action) {
      var topicIndex = state.findIndex(
        (t) => t.id === action.payload.parentTopicId
      );
      state[topicIndex].consultation.splice(0, 1);

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

  //Deadline Actions
  addDeadline,
  updateDeadline,
  removeDeadline,

  //Consultation Actions
  addConsultation,
  updateConsultation,
  removeConsultation,
} = topicsSlice.actions;

export default topicsSlice.reducer;
