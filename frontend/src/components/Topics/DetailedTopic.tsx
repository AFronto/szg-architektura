import React, { FunctionComponent } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { registerForRefreshingTokens } from "../../api/Auth";
import { addQuestion } from "../../store/Topic/QuestionSlice";
import { QuestionCard } from "./QuestionCard";

export const DetailedTopicScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  dispatch(registerForRefreshingTokens());
  var { id } = useParams();

  const schema = yup.object({
    name: yup.string().required(),
  });

  const { handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = handleSubmit((data) => {
    const questionToSend = {
      id: data.id,
      owner: data.owner,
      text: data.questions,
      replies: [],
    };

    dispatch(
      addQuestion({
        newReply: questionToSend,
      })
    );
    //dispatch(createNewReply(replyToSend));
  });

  const questions = [
    {
      id: "1",
      owner: { id: "xyz", email: "xyz", userName: "Bela", isTeacher: false },
      text: "mi ez?",
      replies: [
        {
          id: "10",
          owner: { id: "xy", email: "xy", userName: "Anna", isTeacher: false },
          text: "alma",
        },
        {
          id: "11",
          owner: {
            id: "xyz",
            email: "xyz",
            userName: "Bela",
            isTeacher: false,
          },
          text: "almaspite",
        },
      ],
    },
    {
      id: "2",
      owner: { id: "xyz", email: "xyz", userName: "Bela", isTeacher: false },
      text: "Van süti?",
      replies: [
        {
          id: "20",
          owner: { id: "x", email: "x", userName: "Laci", isTeacher: true },
          text: "nincs :(",
        },
        {
          id: "21",
          owner: {
            id: "xyz",
            email: "xyz",
            userName: "Bela",
            isTeacher: false,
          },
          text: "sad",
        },
      ],
    },
    {
      id: "3",
      owner: { id: "xyzw", email: "xyzw", userName: "Éva", isTeacher: false },
      text: "hello?",
      replies: [],
    },
  ];

  return (
    <>
      <h1>name</h1>
      <h1>description</h1>
      <h1>questions</h1>
      <Row>
        {questions.map((question) => (
          <Col xs={12}>
            <QuestionCard question={question} />
          </Col>
        ))}
      </Row>
      <Col md={12} style={{ marginTop: 40 }}>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group controlId="formQuestion">
            <Form.Control placeholder="Enter your question" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Post your question!
          </Button>
        </Form>
      </Col>
    </>
  );
};
