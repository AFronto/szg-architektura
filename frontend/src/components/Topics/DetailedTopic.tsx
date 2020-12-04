import React, { FunctionComponent } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { registerForRefreshingTokens } from "../../api/Auth";
import { QuestionCard } from "./QuestionCard";

export const DetailedTopicScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  dispatch(registerForRefreshingTokens());
  var { id } = useParams();

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
    </>
  );
};
