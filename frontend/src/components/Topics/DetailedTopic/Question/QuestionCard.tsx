import React, { FunctionComponent } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { updateExistingQuestion } from "../../../../api/Topic/QuestionAPI";
import { createNewReply } from "../../../../api/Topic/ReplyAPI";
import QuestionData from "../../../../data/server/Topic/QuestionData";
import UserData from "../../../../data/server/User/UserData";
import { addReply, updateQuestion } from "../../../../store/Topic";
import { Reply } from "./ReplyCard";

export const QuestionCard: FunctionComponent<{
  topicId: string;
  renderReplies: boolean;
  question: QuestionData;
}> = (props) => {
  const schema = yup.object({
    text: yup.string().required(),
  });

  const dispatch = useDispatch();

  const { register, handleSubmit, errors, reset } = useForm({
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
    reset();
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
            {props.question.owner.userName}:
            {new Date(props.question.creationDate).toLocaleString()}
            <Button variant="secondary" onClick={handleStatusChange}>
              {props.question.isClosed ? "Open" : "Close"}
            </Button>
          </div>
        </Card.Header>
        <Card.Body>{props.question.text}</Card.Body>
      </Card>
      {props.renderReplies && (
        <>
          <Row>
            {props.question.replies.map((reply) => (
              <Col xs={{ span: 10, offset: 1 }}>
                <Reply reply={reply} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col xs={{ span: 10, offset: 1 }}>
              <Form noValidate onSubmit={onSubmit}>
                <Form.Group controlId="formReply">
                  <InputGroup className="mb-3 w-100">
                    <Form.Control
                      placeholder="Enter your reply"
                      name="text"
                      type="text"
                      ref={register}
                    />
                    <InputGroup.Append>
                      <Button variant="secondary" type="submit">
                        Reply
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
