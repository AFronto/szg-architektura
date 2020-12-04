import React, { FunctionComponent, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { initializeScreen } from "../../../api/Auth";
import { getSingleTopic } from "../../../api/Topic";
import { addQuestion } from "../../../store/Topic/QuestionSlice";
import { QuestionList } from "./QuestionList";

export const DetailedTopicScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  var { id } = useParams();

  useEffect(() => {
    dispatch(initializeScreen());
  }, []);

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

  const topic = dispatch(getSingleTopic(id));

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
      <h1>{topic.name}</h1>
      <h1>topic.description</h1>
      <h1>questions</h1>
      <Row>
        <Col xs={12}>
          <QuestionList questions={questions} />
        </Col>
      </Row>
    </>
  );
};
