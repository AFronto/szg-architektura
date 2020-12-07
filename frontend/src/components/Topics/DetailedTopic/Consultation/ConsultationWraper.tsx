import React, { FunctionComponent, useCallback, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ConsultationData from "../../../../data/server/Topic/ConsultationData";
import { ReduxState } from "../../../../store";
import { ConsultationCard } from "./ConsultationCard";
import { ConsultationModal } from "./ConsultationModal";

export const ConsultationWraper: FunctionComponent<{
  parentTopicId: string;
  consultation: ConsultationData[];
}> = (props) => {
  const [show, setShow] = useState(false);

  const topic = useSelector((state: ReduxState) => state.topics).find(
    (t) => t.id === props.parentTopicId
  )!;
  const user = useSelector((state: ReduxState) => state.user);
  const handleClose = useCallback(() => setShow(false), [setShow]);
  const handleShow = () => setShow(true);
  return (
    <>
      <Col xs={12}>
        <ConsultationCard
          parentTopicId={props.parentTopicId}
          consultation={props.consultation}
        />
      </Col>
      {!user.isTeacher && topic.consultation.length === 0 && (
        <Row>
          <Col md={12} style={{ marginTop: 40 }}>
            <Button
              variant="secondary"
              onClick={() => {
                handleShow();
              }}
            >
              Schedule Consultation
            </Button>
          </Col>
        </Row>
      )}
      <ConsultationModal
        model={{ show, handleClose }}
        isNew={true}
        parentTopicId={topic.id}
        questions={topic.questions.filter((q) => q.isPrivate)}
      />
    </>
  );
};
