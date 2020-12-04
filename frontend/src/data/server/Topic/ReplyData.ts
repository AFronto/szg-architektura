import UserData from "../User/UserData";

export default interface ReplyData {
  id: string;
  owner: UserData;
  text: string;
}
