import React, { FunctionComponent } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import TopicData from "../../data/server/Topic/TopicData";

export const TopicCard: FunctionComponent<{ topic: TopicData }> = (props) => {
  const dispatch = useDispatch();

  return (
    <Card style={{ marginBottom: 40 }} className="mx-auto" border="primary">
      <Card.Header as="h5">{props.topic.name}</Card.Header>
      <Card.Body>
        {props.topic.description}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            zIndex: 1,
            marginBottom: 30,
            marginRight: 30,
          }}
        >
          <Button size="lg" variant="success" onClick={() => {}}>
            View Topic
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
