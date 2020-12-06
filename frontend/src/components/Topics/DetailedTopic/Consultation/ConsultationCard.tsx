import React from "react";
import { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import ConsultationData from "../../../../data/server/Topic/ConsultationData";

export const Consultation: FunctionComponent<{
  consultation: ConsultationData;
}> = (props) => {
  return (
    <>
      <Card style={{ marginBottom: 20 }} className="mx-auto" border="primary">
        <Card.Header style={{ background: "GoldenRod" }}>
          {props.consultation.id}
        </Card.Header>
        <Card.Body>status</Card.Body>
      </Card>
    </>
  );
};
