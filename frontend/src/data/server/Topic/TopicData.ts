import UserData from "../User/UserData";

export default interface TopicData {
  id: string;
  name: string;
  description: string;
  owner: UserData;
}
