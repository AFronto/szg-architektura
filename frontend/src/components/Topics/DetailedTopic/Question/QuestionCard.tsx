import React, { FunctionComponent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { createNewReply, updateExistingQuestion } from "../../../../api/Topic";
import QuestionData from "../../../../data/server/Topic/QuestionData";
import UserData from "../../../../data/server/User/UserData";
import { addReply, updateQuestion } from "../../../../store/Topic";
import { Reply } from "./ReplyCard";

export const QuestionCard: FunctionComponent<{
  topicId: string;
  question: QuestionData;
}> = (props) => {
  const schema = yup.object({
    text: yup.string().required(),
  });

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = handleSubmit((data) => {
    const replyToSend = {
      id: "fake_id",
      owner: {} as UserData,
      text: data.text,
      creationDate: "",
    };

    dispatch(
      addReply({
        parentTopicId: props.topicId,
        parentQuestionId: props.question.id,
        newReply: replyToSend,
      })
    );
    dispatch(createNewReply(props.topicId, props.question.id, replyToSend));
  });

  const handleStatusChange = () => {
    let oldQuestion = props.question;
    let newQuestion = {
      ...props.question,
      isClosed: !props.question.isClosed,
    };
    dispatch(
      updateQuestion({
        parentTopicId: props.topicId,
        questionId: props.question.id,
        updatedQuestion: newQuestion,
      })
    );
    dispatch(updateExistingQuestion(props.topicId, oldQuestion, newQuestion));
  };

  const styleClosed = { background: "MediumSeaGreen", color: "white" };
  const styleOpen = { background: "IndianRed", color: "white" };

  return (
    <>
      <Card
        style={{ marginBottom: 20, marginTop: 40 }}
        className="mx-auto"
        border="primary"
      >
        <Card.Header style={props.question.isClosed ? styleClosed : styleOpen}>
          <div className="d-flex justify-content-between">
            {props.question.owner.userName}: {props.question.creationDate}
            <Button variant="secondary" onClick={handleStatusChange}>
              {props.question.isClosed ? "Open" : "Close"}
            </Button>
          </div>
        </Card.Header>
        <Card.Body>{props.question.text}</Card.Body>
      </Card>
      <Row>
        {props.question.replies.map((reply) => (
          <Col md={{ span: 10, offset: 1 }}>
            <Reply reply={reply} />
          </Col>
        ))}
      </Row>
      <Col md={{ span: 10, offset: 1 }}>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group controlId="formReply">
            <Form.Control
              placeholder="Enter your reply"
              name="text"
              type="text"
              ref={register}
            />
          </Form.Group>

          <Button variant="secondary" type="submit">
            Reply
          </Button>
        </Form>
      </Col>
    </>
  );
};
