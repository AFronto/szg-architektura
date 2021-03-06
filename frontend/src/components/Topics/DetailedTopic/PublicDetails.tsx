import React, { FunctionComponent } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../store";
import { WrapperCard } from "./WrapperCard";

export const PublicDetails: FunctionComponent<{
  id: string;
}> = (props) => {
  const { id } = props;
  const topic = useSelector((state: ReduxState) => state.topics).find(
    (t) => t.id === id
  )!;
  return (
    <>
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
                renderReplies: true,
                renderSubmitQuestion: true,
                questions: topic.questions.filter((q) => !q.isPrivate),
              },
            }}
          />
        </Col>
      </Row>
    </>
  );
};
