import DeadlineData from "../../server/Topic/DeadlineData";
import QuestionListData from "../Question/QuestionListData";

export default interface WrapperData {
  header: string;
  show: boolean;
  description?: string;
  questionList?: QuestionListData;
  deadlines?: DeadlineData[];
}
