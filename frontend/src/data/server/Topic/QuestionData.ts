import UserData from "../User/UserData";
import ReplyData from "./ReplyData";

export default interface QuestionData {
  id: string;
  owner: UserData;
  text: string;
  replies: ReplyData[];
}
