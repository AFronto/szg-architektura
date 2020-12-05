import React from "react";
import { FunctionComponent } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import QuestionData from "../../../../data/server/Topic/QuestionData";
import { addReply } from "../../../../store/Topic";
import { QuestionCard } from "./QuestionCard";

export const QuestionList: FunctionComponent<{
  questions: QuestionData[];
}> = (props) => {
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
      <Row>
        {props.questions.map((question) => (
          <Col xs={12}>
            <QuestionCard question={question} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={12} style={{ marginTop: 40 }}>
          <Form noValidate onSubmit={onSubmit}>
            <Form.Group controlId="formQuestion">
              <Form.Control placeholder="Enter your question" />
            </Form.Group>

            <Button variant="secondary" type="submit">
              Post your question!
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
