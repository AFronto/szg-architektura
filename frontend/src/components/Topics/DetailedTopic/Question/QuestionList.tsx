import React from "react";
import { FunctionComponent } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { createNewQuestion } from "../../../../api/Topic/QuestionAPI";
import QuestionListData from "../../../../data/client/Question/QuestionListData";
import UserData from "../../../../data/server/User/UserData";
import { addQuestion } from "../../../../store/Topic";
import { QuestionCard } from "./QuestionCard";

export const QuestionList: FunctionComponent<{
  parentTopicId: string;
  questionList: QuestionListData;
}> = (props) => {
  const { questionList } = props;

  const schema = yup.object({
    text: yup.string().required(),
  });

  const dispatch = useDispatch();

  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: schema,
  });

  const onSubmit = handleSubmit((data) => {
    const questionToSend = {
      id: "fake_id",
      owner: {} as UserData,
      text: data.text,
      replies: [],
      creationDate: "",
      isPrivate: questionList.isPrivate,
      isClosed: false,
    };

    dispatch(
      addQuestion({
        parentTopicId: props.parentTopicId,
        newQuestion: questionToSend,
      })
    );
    dispatch(createNewQuestion(props.parentTopicId, questionToSend));
    reset();
  });

  return (
    <>
      <Row>
        {questionList.questions.map((question) => (
          <Col xs={12}>
            <QuestionCard
              topicId={props.parentTopicId}
              renderReplies={props.questionList.renderReplies}
              question={question}
            />
          </Col>
        ))}
      </Row>
      <Row>
        {props.questionList.renderSubmitQuestion && (
          <Col md={12} style={{ marginTop: 40 }}>
            <Form noValidate onSubmit={onSubmit}>
              <Form.Group controlId="formQuestion">
                <InputGroup className="mb-3 w-100">
                  <Form.Control
                    placeholder="Enter your question"
                    name="text"
                    type="text"
                    ref={register}
                    isInvalid={!!errors.text}
                  />
                  <InputGroup.Append>
                    <Button variant="secondary" type="submit">
                      Post your question!
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              <Form.Control.Feedback type="invalid">
                <h6>
                  {errors.text
                    ? Array.isArray(errors.text)
                      ? errors.text[0].message
                      : errors.text.message
                    : ""}
                </h6>
              </Form.Control.Feedback>
            </Form>
          </Col>
        )}
      </Row>
    </>
  );
};
