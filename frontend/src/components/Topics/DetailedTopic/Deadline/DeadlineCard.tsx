import React, { FunctionComponent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import DeadlineData from "../../../../data/server/Topic/DeadlineData";
import { updateDeadline } from "../../../../store/Topic";

export const DeadlineCard: FunctionComponent<{
  parentTopicId: string;
  deadline: DeadlineData;
}> = (props) => {
  const { deadline } = props;

  const schema = yup.object({
    link: yup.string().required(),
  });

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmitLink = handleSubmit((data) => {
    dispatch(
      updateDeadline({
        parentTopicId: props.parentTopicId,
        newDeadline: {
          id: deadline.id,
          description: deadline.description,
          date: deadline.date,
          link: data.link,
          isDone: deadline.isDone,
        },
      })
    );
  });

  const switchStatus = () => {
    dispatch(
      updateDeadline({
        parentTopicId: props.parentTopicId,
        newDeadline: {
          id: deadline.id,
          description: deadline.description,
          date: deadline.date,
          link: deadline.link,
          isDone: deadline.isDone ? false : true,
        },
      })
    );
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
            : new Date(Date.now()) < new Date(deadline.date)
            ? styleInProgress
            : styleDeadline
        }
      >
        Deadline: {deadline.date}
      </Card.Header>
      <Card.Body>
        <Row style={{ marginBottom: 20 }}>{deadline.description}</Row>
        <Row style={{ marginBottom: 20 }}>Solution link: {deadline.link}</Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md={12}>
            <Form noValidate onSubmit={onSubmitLink}>
              <Form.Group controlId="formLink">
                <Form.Control
                  name="link"
                  type="text"
                  ref={register}
                  isInvalid={!!errors.link}
                  placeholder="Add the solution link to the deadline"
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                <h6>
                  {errors.link
                    ? Array.isArray(errors.link)
                      ? errors.link[0].message
                      : errors.link.message
                    : ""}
                </h6>
              </Form.Control.Feedback>
              <div className="d-flex justify-content-between">
                <Button variant="secondary" type="submit">
                  Add Link
                </Button>
                <Button variant="secondary" onClick={switchStatus}>
                  {deadline.isDone ? "Reopen" : "Finish"}
                </Button>
                <Button variant="secondary">Edit deadline</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
