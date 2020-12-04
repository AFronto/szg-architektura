import { createSlice } from "@reduxjs/toolkit";
import ReplyData from "../../data/server/Topic/ReplyData";

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
  loadReplies,
  addReply,
  updateReply,
  removeReply,
} = repliesSlice.actions;

export default repliesSlice.reducer;
