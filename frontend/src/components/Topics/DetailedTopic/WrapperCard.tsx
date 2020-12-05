import React, { useState } from "react";
import { FunctionComponent } from "react";
import { Button, Card, Col } from "react-bootstrap";
import WrapperData from "../../../data/client/Wrapper/WrapperData";
import { DeadlineCard } from "./DeadlineCard";
import { DeadlineList } from "./DeadlineList";
import { QuestionList } from "./QuestionList";

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
      <Card.Header as="h5" style={{ background: "#006400", color: "white" }}>
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
          {data.questions !== undefined && (
            <Col xs={12}>
              <QuestionList questions={data.questions} />
            </Col>
          )}
          {data.description !== undefined && (
            <Col xs={12}>{data.description}</Col>
          )}
          {data.deadlines !== undefined && (
            <Col xs={12}>
              <DeadlineList deadlines={data.deadlines} />
            </Col>
          )}
        </Card.Body>
      )}
    </Card>
  );
};
