import QuestionData from "./QuestionData";

export default interface ConsultationData {
  id: string;
  date: string;
  questions: QuestionData[];
  isStudentAccepted: boolean;
  isTeacherAccepted: boolean;
}
