import React from "react";
import { FunctionComponent } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { createNewQuestion } from "../../../../api/Topic";
import QuestionListData from "../../../../data/client/Question/QuestionListData";
import UserData from "../../../../data/server/User/UserData";
import { addQuestion } from "../../../../store/Topic";
import { QuestionCard } from "./QuestionCard";

export const QuestionList: FunctionComponent<{
  questionList: QuestionListData;
}> = (props) => {
  const { questionList } = props;

  const schema = yup.object({
    text: yup.string().required(),
  });

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = handleSubmit((data) => {
    console.log("rs");
    const questionToSend = {
      id: "fake_id",
      owner: {} as UserData,
      text: data.text,
      replies: [],
      creationDate: new Date(Date.now()),
      isPrivate: questionList.isPrivate,
    };
    console.log("r");

    dispatch(
      addQuestion({
        parentTopicId: questionList.topicId,
        newQuestion: questionToSend,
      })
    );
    dispatch(createNewQuestion(questionList.topicId, questionToSend));
  });

  return (
    <>
      <Row>
        {questionList.questions.map((question) => (
          <Col xs={12}>
            <QuestionCard topicId={questionList.topicId} question={question} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col md={12} style={{ marginTop: 40 }}>
          <Form noValidate onSubmit={onSubmit}>
            <Form.Group controlId="formQuestion">
              <Form.Control
                placeholder="Enter your question"
                name="text"
                type="text"
                ref={register}
                isInvalid={!!errors.text}
              />
              <Form.Control.Feedback type="invalid">
                <h6>
                  {errors.text
                    ? Array.isArray(errors.text)
                      ? errors.text[0].message
                      : errors.text.message
                    : ""}
                </h6>
              </Form.Control.Feedback>
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
