import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { initializeScreen } from "../../../api/Auth";
import { deleteTopic, getSingleTopic } from "../../../api/Topic";
import QuestionData from "../../../data/server/Topic/QuestionData";
import { ReduxState } from "../../../store";
import { removeTopic } from "../../../store/Topic";
import { ConsultationModal } from "./Consultation/ConsultationModal";
import { WrapperCard } from "./WrapperCard";

export const DetailedTopicScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  var { id } = useParams();

  const topic = useSelector((state: ReduxState) => state.topics).find(
    (t) => t.id === id
  );

  const consultation = {
    id: "10",
    date: "2020-12-10",
    questions: [] as QuestionData[],
    isStudentAccepted: true,
    isTeacherAccepted: false,
  };
  useEffect(() => {
    dispatch(initializeScreen());
    dispatch(getSingleTopic(id));
  }, []);

  const user = useSelector((state: ReduxState) => state.user);

  const deleteTopicPressed = () => {
    dispatch(removeTopic({ topicId: topic!.id }));
    dispatch(deleteTopic(topic!));
  };

  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), [setShow]);
  const handleShow = () => setShow(true);

  return (
    <>
      {topic !== undefined ? (
        <>
          <Row>
            <h1>{topic.name}</h1>
          </Row>
          <div className="d-flex justify-content-between">
            {user.isTeacher && (
              <Button variant="primary" onClick={handleShow}>
                Schedule Consultation
              </Button>
            )}

            {user.isTeacher && user.id === topic.owner.id && (
              <Button variant="danger" onClick={deleteTopicPressed}>
                Delete
              </Button>
            )}
          </div>

          <Row>
            <Col xs={12}>
              <WrapperCard
                data={{
                  header: "Topic Description",
                  show: true,
                  description: topic.description,
                  parentTopicId: topic.id,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WrapperCard
                data={{
                  header: "Public Questions",
                  show: true,
                  parentTopicId: topic.id,
                  questionList: {
                    isPrivate: false,
                    questions: topic.questions,
                  },
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WrapperCard
                data={{
                  header: "Private Questions",
                  show: false,
                  parentTopicId: topic.id,
                  questionList: {
                    isPrivate: true,
                    questions: topic.questions,
                  },
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WrapperCard
                data={{
                  header: "Deadlines",
                  show: false,
                  parentTopicId: topic.id,
                  deadlines: topic.deadlines,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WrapperCard
                data={{
                  header: "Upcoming Consultation",
                  show: false,
                  parentTopicId: topic.id,
                  consultation: consultation,
                }}
              />
            </Col>
          </Row>
          <ConsultationModal
            model={{ show, handleClose }}
            isNew={true}
            parentTopicId={topic.id}
            questions={topic.questions}
          />
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};
