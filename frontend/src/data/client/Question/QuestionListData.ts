import QuestionData from "../../server/Topic/QuestionData";

export default interface QuestionListData {
  isPrivate: boolean;
  renderReplies: boolean;
  renderSubmitQuestion: boolean;
  questions: QuestionData[];
}
