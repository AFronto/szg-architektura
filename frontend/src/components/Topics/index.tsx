import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { ReduxState } from "../../store";
import { TopicCard } from "./TopicCard";
import { getTopics } from "../../api/Topic";
import { TopicModal } from "./TopicModal";
import { registerForRefreshingTokens } from "../../api/Auth";

export const TopicsScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  dispatch(registerForRefreshingTokens());

  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), [setShow]);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getTopics());
  }, []);

  const topics = useSelector((state: ReduxState) => state.topics);
  // const topics = [
  //   { id: "1", name: "elso", description: "test" },
  //   { id: "2", name: "masodik", description: "test" },
  //   { id: "3", name: "3", description: "test" },
  // ];

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
        <Button
          size="lg"
          variant="success"
          onClick={() => {
            handleShow();
          }}
        >
          Add
        </Button>
      </div>

      <TopicModal model={{ show, handleClose }} isNew={true} />
    </>
  );
};
