import React, { useCallback, useState } from "react";
import { FunctionComponent } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConsultation,
  updateExistingConsultation,
} from "../../../../api/Topic/ConsultationAPI";
import ConsultationData from "../../../../data/server/Topic/ConsultationData";
import { ReduxState } from "../../../../store";
import {
  removeConsultation,
  updateConsultation,
} from "../../../../store/Topic";
import { QuestionList } from "../Question/QuestionList";
import { ConsultationModal } from "./ConsultationModal";
import { FaCalendarAlt } from "react-icons/fa";

export const ConsultationCard: FunctionComponent<{
  parentTopicId: string;
  consultation: ConsultationData[];
}> = (props) => {
  const { consultation } = props;
  const dispatch = useDispatch();

  const user = useSelector((state: ReduxState) => state.user);

  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), [setShow]);
  const handleShow = () => setShow(true);

  const AcceptConsultation = () => {
    let oldConsultation = consultation[0];
    let newConsultation = {
      ...consultation[0],
      status: "accepted",
      lastModified: user.isTeacher ? "teacher" : "student",
    };
    dispatch(
      updateConsultation({
        parentTopicId: props.parentTopicId,
        updatedConsultation: newConsultation,
      })
    );
    dispatch(
      updateExistingConsultation(
        props.parentTopicId,
        oldConsultation,
        newConsultation
      )
    );
  };

  const RejectConsultation = () => {
    let oldConsultation = consultation[0];
    let newConsultation = {
      ...consultation[0],
      status: "rejected",
      lastModified: user.isTeacher ? "teacher" : "student",
    };
    dispatch(
      updateConsultation({
        parentTopicId: props.parentTopicId,
        updatedConsultation: newConsultation,
      })
    );
    dispatch(
      updateExistingConsultation(
        props.parentTopicId,
        oldConsultation,
        newConsultation
      )
    );
  };

  const DeleteConsultation = () => {
    dispatch(
      removeConsultation({
        parentTopicId: props.parentTopicId,
      })
    );
    dispatch(deleteConsultation(props.parentTopicId, consultation[0]));
  };

  var AcceptButton = (
    <Button
      variant="success"
      className="border border-success mr-3"
      onClick={AcceptConsultation}
    >
      Accept
    </Button>
  );
  var RescheduleButton = (
    <Button variant="outline-light" onClick={handleShow}>
      <FaCalendarAlt />
    </Button>
  );
  var RejectButton = (
    <Button
      variant="danger"
      className="border border-danger"
      onClick={RejectConsultation}
    >
      Reject
    </Button>
  );
  var DeleteButton = (
    <Button
      variant="danger"
      className="border border-danger"
      onClick={DeleteConsultation}
    >
      Delete
    </Button>
  );

  const stylePending = { background: "CornflowerBlue", color: "white" };
  const styleAccepted = { background: "MediumSeaGreen", color: "white" };
  const styleRejected = { background: "IndianRed", color: "white" };

  return (
    <>
      {consultation.length > 0 && (
        <>
          <Card
            style={{ marginBottom: 20 }}
            className="mx-auto"
            border="primary"
          >
            <Card.Header
              style={
                consultation[0].status === "accepted"
                  ? styleAccepted
                  : consultation[0].status === "pending"
                  ? stylePending
                  : styleRejected
              }
            >
              <div className="d-flex justify-content-between">
                <a>{new Date(consultation[0].date).toLocaleString()}</a>
                {RescheduleButton}
              </div>
            </Card.Header>
            <Card.Body>
              <>
                <div className="d-flex justify-content-between">
                  {consultation[0].status === "accepted" && (
                    <h6>Meeting accepted!</h6>
                  )}

                  {consultation[0].status === "rejected" && (
                    <h6>Meeting was rejected!</h6>
                  )}

                  {user.isTeacher &&
                    consultation[0].status === "pending" &&
                    consultation[0].lastModified === "student" && (
                      <h6>Meeting request.</h6>
                    )}
                  {user.isTeacher &&
                    consultation[0].status === "pending" &&
                    consultation[0].lastModified === "teacher" && (
                      <h6>Waiting for student to accept the meeting.</h6>
                    )}

                  {!user.isTeacher &&
                    consultation[0].status === "pending" &&
                    consultation[0].lastModified === "student" && (
                      <h6>Waiting for teacher to accept the meeting.</h6>
                    )}
                  {!user.isTeacher &&
                    consultation[0].status === "pending" &&
                    consultation[0].lastModified === "teacher" && (
                      <h6>Meeting request.</h6>
                    )}
                  <div>
                    {((user.isTeacher &&
                      consultation[0].status === "pending" &&
                      consultation[0].lastModified === "student") ||
                      (!user.isTeacher &&
                        consultation[0].status === "pending" &&
                        consultation[0].lastModified === "teacher")) && (
                      <>{AcceptButton}</>
                    )}
                    {!user.isTeacher && <>{DeleteButton}</>}
                    {user.isTeacher && <>{RejectButton}</>}
                  </div>
                </div>
                <Row>
                  <Col xs={12}>
                    <QuestionList
                      parentTopicId={props.parentTopicId}
                      questionList={{
                        isPrivate: true,
                        renderReplies: false,
                        renderSubmitQuestion: false,
                        questions: consultation[0].questions,
                      }}
                    />
                  </Col>
                </Row>
              </>
            </Card.Body>
          </Card>
          <ConsultationModal
            model={{ show, handleClose }}
            isNew={false}
            parentTopicId={props.parentTopicId}
            questions={consultation[0].questions}
            consultation={consultation[0]}
          />
        </>
      )}
    </>
  );
};
