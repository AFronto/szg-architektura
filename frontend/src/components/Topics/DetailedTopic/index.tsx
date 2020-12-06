import { push } from "connected-react-router";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { initializeScreen } from "../../../api/Auth";
import { deleteTopic, getSingleTopic, getTopics } from "../../../api/Topic";
import { ReduxState } from "../../../store";
import { addQuestion, removeTopic, updateTopic } from "../../../store/Topic";
import { WrapperCard } from "./WrapperCard";

export const DetailedTopicScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  var { id } = useParams();

  const topic = useSelector((state: ReduxState) => state.topics).find(
    (t) => t.id === id
  );

  const deadlines = [
    {
      id: "1",
      description: "login screen",
      date: "2020-11-30",
      link: "link",
      isDone: true,
    },
    {
      id: "2",
      description: "logout screen",
      date: "2020-12-01",
      link: "link",
      isDone: false,
    },
    {
      id: "3",
      description: "backend",
      date: "2020-12-30",
      link: "link",
      isDone: false,
    },
  ];

  useEffect(() => {
    dispatch(initializeScreen());
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
        parentTopicId: id,
        newReply: questionToSend,
      })
    );
    //dispatch(createNewReply(replyToSend));
  });

  const user = useSelector((state: ReduxState) => state.user);

  const deleteTopicPressed = () => {
    dispatch(removeTopic({ topicId: topic!.id }));
    dispatch(deleteTopic(topic!));
  };

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
          <Row>
            <Col xs={12}>
              <WrapperCard
                data={{
                  header: "Topic Description",
                  show: true,
                  description: topic.description,
                  parentTopicId: topic.id,
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WrapperCard
                data={{
                  header: "Public Questions",
                  show: true,
                  parentTopicId: topic.id,
                  questionList: {
                    isPrivate: false,
                    questions: topic.questions,
                  },
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WrapperCard
                data={{
                  header: "Private Questions",
                  show: false,
                  parentTopicId: topic.id,
                  questionList: {
                    isPrivate: true,
                    questions: topic.questions,
                  },
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <WrapperCard
                data={{
                  header: "Deadlines",
                  show: false,
                  parentTopicId: topic.id,
                  deadlines: deadlines,
                }}
              />
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
