import UserData from "../User/UserData";
import ConsultationData from "./ConsultationData";
import DeadlineData from "./DeadlineData";
import QuestionData from "./QuestionData";

export default interface TopicData {
  id: string;
  name: string;
  description: string;
  owner: UserData;
  questions: QuestionData[];
  deadlines: DeadlineData[];
  consultation: ConsultationData[];
}
