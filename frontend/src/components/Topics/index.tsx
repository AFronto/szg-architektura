import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { ReduxState } from "../../store";
import { TopicCard } from "./TopicCard";

export const TopicsScreen: FunctionComponent = () => {
  //const topics = useSelector((state: ReduxState) => state.topics);
  const topics = [
    { id: "1", name: "elso", description: "test" },
    { id: "2", name: "masodik", description: "test" },
    { id: "3", name: "3", description: "test" },
  ];

  return (
    <>
      <h1>Topics</h1>
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
