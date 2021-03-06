import React, { useState } from "react";
import { FunctionComponent } from "react";
import { Button, Card, Col } from "react-bootstrap";
import WrapperData from "../../../data/client/Wrapper/WrapperData";
import { ConsultationWraper } from "./Consultation/ConsultationWraper";
import { DeadlineList } from "./Deadline/DeadlineList";
import { QuestionList } from "./Question/QuestionList";

export const WrapperCard: FunctionComponent<{
  data: WrapperData;
}> = (props) => {
  const { data } = props;
  const [show, setShow] = useState(data.show);

  const handleShow = () => {
    show ? setShow(false) : setShow(true);
  };

  return (
    <Card
      style={{ marginBottom: 20, marginTop: 40 }}
      className="mx-auto"
      border="primary"
    >
      <Card.Header as="h5" style={{ background: "DarkGray", color: "black" }}>
        <div className="d-flex justify-content-between">
          {data.header}
          <Button
            variant="secondary"
            onClick={() => {
              handleShow();
            }}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </div>
      </Card.Header>
      {show && (
        <Card.Body>
          {data.questionList !== undefined && (
            <Col xs={12}>
              <QuestionList
                parentTopicId={data.parentTopicId}
                questionList={data.questionList}
              />
            </Col>
          )}
          {data.description !== undefined && (
            <Col xs={12}>{data.description}</Col>
          )}
          {data.deadlines !== undefined && (
            <Col xs={12}>
              <DeadlineList
                parentTopicId={data.parentTopicId}
                deadlines={data.deadlines}
              />
            </Col>
          )}
          {data.consultation !== undefined && (
            <Col xs={12}>
              <ConsultationWraper
                parentTopicId={data.parentTopicId}
                consultation={data.consultation}
              />
            </Col>
          )}
        </Card.Body>
      )}
    </Card>
  );
};
