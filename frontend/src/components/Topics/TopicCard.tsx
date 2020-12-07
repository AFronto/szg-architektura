import { push } from "connected-react-router";
import React, { FunctionComponent } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationForTopic } from "../../api/Topic";
import TopicData from "../../data/server/Topic/TopicData";
import { ReduxState } from "../../store";

export const TopicCard: FunctionComponent<{ topic: TopicData }> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.user);

  return (
    <Card style={{ marginBottom: 40 }} className="mx-auto" border="primary">
      <Card.Header as="h5">
        <div className="d-flex justify-content-between">
          <a>{props.topic.name}</a>
          {props.topic.studentOnTopic.length === 0 && !user.isTeacher && (
            <Button
              variant="success"
              onClick={() => {
                dispatch(setApplicationForTopic(props.topic.id));
              }}
            >
              Apply
            </Button>
          )}
          {props.topic.studentOnTopic.length === 1 &&
            props.topic.studentOnTopic[0].id === user.id &&
            !user.isTeacher && (
              <Button
                variant="danger"
                onClick={() => {
                  dispatch(setApplicationForTopic("revoke"));
                }}
              >
                Revoke Application
              </Button>
            )}
        </div>
      </Card.Header>
      <Card.Body>
        {props.topic.description}
        <div className="d-flex justify-content-end">
          <Button
            variant="success"
            onClick={() => {
              dispatch(push(`/topics/${props.topic.id}`));
            }}
          >
            View Topic
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
