import React, { FunctionComponent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import QuestionData from "../../../data/server/Topic/QuestionData";
import { addReply } from "../../../store/Topic/ReplySlice";
import { Reply } from "./ReplyCard";

export const QuestionCard: FunctionComponent<{ question: QuestionData }> = (
  props
) => {
  const schema = yup.object({
    name: yup.string().required(),
  });

  const dispatch = useDispatch();

  const { handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = handleSubmit((data) => {
    const replyToSend = {
      id: data.id,
      owner: data.owner,
      text: data.questions,
    };

    dispatch(
      addReply({
        newReply: replyToSend,
      })
    );
    //dispatch(createNewReply(replyToSend));
  });

  return (
    <>
      <Card
        style={{ marginBottom: 20, marginTop: 40 }}
        className="mx-auto"
        border="primary"
      >
        <Card.Header>{props.question.owner.userName}</Card.Header>
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
            <Form.Control placeholder="Enter your reply" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Reply
          </Button>
        </Form>
      </Col>
    </>
  );
};
