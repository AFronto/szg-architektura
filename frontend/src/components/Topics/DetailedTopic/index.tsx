import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { initializeScreen } from "../../../api/Auth";
import { deleteTopic, getSingleTopic } from "../../../api/Topic";
import { ReduxState } from "../../../store";
import { removeTopic } from "../../../store/Topic";
import { ConsultationModal } from "./Consultation/ConsultationModal";
import { PrivatecDetails } from "./PrivateDetails";
import { PublicDetails } from "./PublicDetails";
import { WrapperCard } from "./WrapperCard";

export const DetailedTopicScreen: FunctionComponent = () => {
  const dispatch = useDispatch();
  var { id } = useParams();

  const topic = useSelector((state: ReduxState) => state.topics).find(
    (t) => t.id === id
  );

  useEffect(() => {
    dispatch(initializeScreen());
    dispatch(getSingleTopic(id));
  }, []);

  const user = useSelector((state: ReduxState) => state.user);

  const deleteTopicPressed = () => {
    dispatch(removeTopic({ topicId: topic!.id }));
    dispatch(deleteTopic(topic!));
  };

  return (
    <>
      {topic !== undefined ? (
        <>
          <Row>
            <Col xs={12}>
              <div className="d-flex justify-content-between">
                <h1>{topic.name}</h1>
                {user.isTeacher && user.id === topic.owner.id && (
                  <Button variant="danger" onClick={deleteTopicPressed}>
                    Delete
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          {(!user.isTeacher &&
            topic.studentOnTopic.length > 0 &&
            topic.studentOnTopic[0].id === user.id) ||
          (user.isTeacher && user.id === topic.owner.id) ? (
            <PrivatecDetails id={id} />
          ) : (
            <PublicDetails id={id} />
          )}
        </>
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};
