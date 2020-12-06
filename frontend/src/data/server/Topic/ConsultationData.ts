import QuestionData from "./QuestionData";

export default interface ConsultationData {
  id: string;
  date: string;
  questions: QuestionData[];
  lastModified: string; // student, teacher
  status: string; // pending, accepted, rejected
}
