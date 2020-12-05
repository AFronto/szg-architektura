import QuestionData from "../../server/Topic/QuestionData";

export default interface QuestionListData {
  topicId: string;
  isPrivate: boolean;
  questions: QuestionData[];
}
