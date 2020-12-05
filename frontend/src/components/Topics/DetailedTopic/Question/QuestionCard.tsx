import React, { FunctionComponent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { createNewReply } from "../../../../api/Topic";
import QuestionData from "../../../../data/server/Topic/QuestionData";
import UserData from "../../../../data/server/User/UserData";
import { addReply } from "../../../../store/Topic";
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
      creationDate: new Date(Date.now()),
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

  return (
    <>
      <Card
        style={{ marginBottom: 20, marginTop: 40 }}
        className="mx-auto"
        border="primary"
      >
        <Card.Header style={{ background: "#7E0000", color: "white" }}>
          {props.question.owner.userName}
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
