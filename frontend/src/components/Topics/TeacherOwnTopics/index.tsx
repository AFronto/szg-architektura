import React, { FunctionComponent } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../store";
import { TopicCard } from "../TopicCard";

export const TeacherOwnTopicsScreen: FunctionComponent = () => {
  const user = useSelector((state: ReduxState) => state.user);
  const topics = useSelector((state: ReduxState) => state.topics).filter(
    (t) => t.owner.id === user.id
  );
  return (
    <>
      <h1>My Topics</h1>
      <Row>
        {topics.map((topicCard) => (
          <Col xs={12}>
            <TopicCard topic={topicCard} />
          </Col>
        ))}
      </Row>
    </>
  );
};
