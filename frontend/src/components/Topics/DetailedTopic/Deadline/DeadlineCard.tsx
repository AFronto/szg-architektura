import React, { FunctionComponent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import DeadlineData from "../../../../data/server/Topic/DeadlineData";

export const DeadlineCard: FunctionComponent<{ deadline: DeadlineData }> = (
  props
) => {
  const { deadline } = props;

  const schema = yup.object({
    name: yup.string().required(),
  });

  const dispatch = useDispatch();

  const { handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmitLink = handleSubmit((data) => {
    // dispatch(
    //   addLinkToDeadline({
    //     link: data.link,
    //   })
    // );
  });

  const switchStatus = () => {
    //deadline.isDone ? dispatch() : dispatch();
  };

  const styleInProgress = { background: "CornflowerBlue", color: "white" };
  const styleFinished = { background: "MediumSeaGreen", color: "white" };
  const styleDeadline = { background: "IndianRed", color: "white" };

  return (
    <Card
      style={{ marginBottom: 20, marginTop: 40 }}
      className="mx-auto"
      border="primary"
    >
      <Card.Header
        style={
          deadline.isDone
            ? styleFinished
            : new Date(Date.now()) < deadline.date
            ? styleInProgress
            : styleDeadline
        }
      >
        Deadline: {deadline.date.toDateString()}
      </Card.Header>
      <Card.Body>
        <Row style={{ marginBottom: 20 }}>{deadline.description}</Row>
        <Row style={{ marginBottom: 20 }}>Solution link: {deadline.link}</Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md={12}>
            <Form noValidate onSubmit={onSubmitLink}>
              <Form.Group controlId="formLink">
                <Form.Control placeholder="Add the solution link to the deadline" />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" type="submit">
                  Add Link
                </Button>
                <Button variant="secondary" onClick={switchStatus}>
                  {deadline.isDone ? "Reopen" : "Finish"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
