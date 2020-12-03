import React, { FunctionComponent } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import TopicData from "../../data/server/Topic/TopicData";

export const TopicCard: FunctionComponent<{ topic: TopicData }> = (props) => {
  const dispatch = useDispatch();

  return (
    <Card style={{ marginBottom: 40 }} className="mx-auto" border="primary">
      <Card.Header as="h5">{props.topic.name}</Card.Header>
      <Card.Body>props.topic.description</Card.Body>
    </Card>
  );
};
