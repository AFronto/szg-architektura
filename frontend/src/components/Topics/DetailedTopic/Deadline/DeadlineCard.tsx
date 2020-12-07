import React, { FunctionComponent, useCallback, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { updateExistingDeadline } from "../../../../api/Topic/DeadlineAPI";
import DeadlineData from "../../../../data/server/Topic/DeadlineData";
import { ReduxState } from "../../../../store";
import { updateDeadline } from "../../../../store/Topic";
import { DeadlineModal } from "./DeadlineModal";
import { FaPencilAlt } from "react-icons/fa";

export const DeadlineCard: FunctionComponent<{
  parentTopicId: string;
  deadline: DeadlineData;
}> = (props) => {
  const { deadline } = props;

  const schema = yup.object({
    link: yup.string().required(),
  });

  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.user);

  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: schema,
  });

  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), [setShow]);
  const handleShow = () => setShow(true);

  const onSubmitLink = handleSubmit((data) => {
    let oldDeadline = deadline;
    let newDeadline = {
      ...deadline,
      link: data.link,
    };
    dispatch(
      updateDeadline({
        parentTopicId: props.parentTopicId,
        deadlineId: deadline.id,
        updatedDeadline: newDeadline,
      })
    );
    dispatch(
      updateExistingDeadline(props.parentTopicId, oldDeadline, newDeadline)
    );
    reset();
  });

  const switchStatus = () => {
    let oldDeadline = deadline;
    let newDeadline = {
      ...deadline,
      isDone: !deadline.isDone,
    };
    dispatch(
      updateDeadline({
        parentTopicId: props.parentTopicId,
        deadlineId: deadline.id,
        updatedDeadline: newDeadline,
      })
    );
    dispatch(
      updateExistingDeadline(props.parentTopicId, oldDeadline, newDeadline)
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
        <div className="d-flex justify-content-between">
          <a>Deadline: {new Date(deadline.date).toLocaleString()}</a>
          <Button variant="outline-light" onClick={handleShow}>
            <FaPencilAlt />
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row style={{ marginBottom: 20 }}>
          <Col md={12}>{deadline.description}</Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md={12}>
            <h6>Solution link:</h6> <a href={deadline.link}>{deadline.link}</a>
          </Col>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col md={12}>
            {!user.isTeacher && (
              <Form noValidate onSubmit={onSubmitLink}>
                <Form.Group controlId="formLink">
                  <InputGroup className="mb-3 w-100">
                    <Form.Control
                      name="link"
                      type="link"
                      ref={register}
                      isInvalid={!!errors.link}
                      placeholder="Add the solution link to the deadline"
                    />
                    <InputGroup.Append>
                      <Button variant="secondary" type="submit">
                        Add Link
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
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
              </Form>
            )}
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={switchStatus}>
                {deadline.isDone ? "Reopen" : "Finish"}
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
      <DeadlineModal
        model={{ show, handleClose }}
        isNew={false}
        parentTopicId={props.parentTopicId}
        deadline={deadline}
      />
    </Card>
  );
};
