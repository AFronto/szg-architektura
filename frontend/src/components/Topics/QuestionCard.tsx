import React, { FunctionComponent } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import QuestionData from "../../data/server/Topic/QuestionData";
import { Reply } from "./ReplyCard";

export const QuestionCard: FunctionComponent<{ question: QuestionData }> = (
  props
) => {
  return (
    <>
      <Card
        style={{ marginBottom: 20, marginTop: 40 }}
        className="mx-auto"
        border="primary"
      >
        <Card.Header as="h5">{props.question.owner.userName}</Card.Header>
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
        <Form>
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
