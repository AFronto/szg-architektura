import DeadlineData from "../../server/Topic/DeadlineData";
import QuestionData from "../../server/Topic/QuestionData";

export default interface WrapperData {
  header: string;
  show: boolean;
  description?: string;
  questions?: QuestionData[];
  deadlines?: DeadlineData[];
}
