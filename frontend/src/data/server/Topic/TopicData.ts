import UserData from "../User/UserData";
import QuestionData from "./QuestionData";

export default interface TopicData {
  id: string;
  name: string;
  description: string;
  owner: UserData;
  questions: QuestionData[];
}
