import { push } from "connected-react-router";
import React, { FunctionComponent, useEffect } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { initializeScreen } from "../../../api/Auth";
import { deleteTopic, getSingleTopic, getTopics } from "../../../api/Topic";
import { ReduxState } from "../../../store";
import { removeTopic } from "../../../store/Topic";
import { addQuestion } from "../../../store/Topic/QuestionSlice";
import { QuestionList } from "./QuestionList";

export const DetailedTopicScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  var { id } = useParams();

  useEffect(() => {
    dispatch(initializeScreen());
    dispatch(getTopics());
    dispatch(getSingleTopic(id));
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

  const topic = useSelector((state: ReduxState) => state.topics).find(
    (t) => t.id === id
  );
  const user = useSelector((state: ReduxState) => state.user);

  const deleteTopicPressed = () => {
    dispatch(removeTopic({ topicId: topic!.id }));
    dispatch(deleteTopic(topic!));
  };

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
      isPrivate: false,
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
      isPrivate: false,
    },
    {
      id: "3",
      owner: { id: "xyzw", email: "xyzw", userName: "Éva", isTeacher: false },
      text: "hello?",
      replies: [],
      isPrivate: false,
    },
  ];

  return (
    <>
      {topic !== undefined ? (
        <>
          <div className="d-flex justify-content-between">
            <h1>{topic.name}</h1>
            {user.isTeacher && user.id === topic.owner.id && (
              <Button size="lg" variant="danger" onClick={deleteTopicPressed}>
                Delete
              </Button>
            )}
          </div>
          <h1>topic.description</h1>
          <h1>questions</h1>
          <Row>
            <Col xs={12}>
              <QuestionList questions={questions} />
            </Col>
          </Row>
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};
