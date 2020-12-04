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
  },
});

export const {
  loadTopics,
  addTopic,
  updateTopic,
  removeTopic,
} = topicsSlice.actions;

export default topicsSlice.reducer;
