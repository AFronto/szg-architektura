import QuestionData from "../../server/Topic/QuestionData";

export default interface QuestionListData {
  isPrivate: boolean;
  questions: QuestionData[];
}
