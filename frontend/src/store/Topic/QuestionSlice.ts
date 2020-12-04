import { createSlice } from "@reduxjs/toolkit";
import QuestionData from "../../data/server/Topic/QuestionData";

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

export const {
  loadQuestions,
  addQuestion,
  updateQuestion,
  removeQuestion,
} = questionsSlice.actions;

export default questionsSlice.reducer;
