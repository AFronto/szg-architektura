import React, { FunctionComponent, useCallback, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import * as yup from "yup";
import DeadlineData from "../../../../data/server/Topic/DeadlineData";
import { DeadlineCard } from "./DeadlineCard";
import { DeadlineModal } from "./DeadlineModal";

export const DeadlineList: FunctionComponent<{
  parentTopicId: string;
  deadlines: DeadlineData[];
}> = (props) => {
  const schema = yup.object({
    name: yup.string().required(),
  });

  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), [setShow]);
  const handleShow = () => setShow(true);
  return (
    <>
      <Row>
        {props.deadlines.map((deadline) => (
          <Col xs={12}>
            <DeadlineCard
              parentTopicId={props.parentTopicId}
              deadline={deadline}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={12} style={{ marginTop: 40 }}>
          <Button
            variant="secondary"
            onClick={() => {
              handleShow();
            }}
          >
            Add a new deadline
          </Button>
        </Col>
      </Row>
      <DeadlineModal
        model={{ show, handleClose }}
        isNew={true}
        parentTopicId={props.parentTopicId}
      />
    </>
  );
};
