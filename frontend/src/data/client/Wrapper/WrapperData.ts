import ConsultationData from "../../server/Topic/ConsultationData";
import DeadlineData from "../../server/Topic/DeadlineData";
import QuestionListData from "../Question/QuestionListData";

export default interface WrapperData {
  header: string;
  show: boolean;
  parentTopicId: string;
  description?: string;
  questionList?: QuestionListData;
  deadlines?: DeadlineData[];
  consultation?: ConsultationData;
}
