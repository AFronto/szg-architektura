import React from "react";
import { FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ConsultationData from "../../../../data/server/Topic/ConsultationData";
import { ReduxState } from "../../../../store";

export const Consultation: FunctionComponent<{
  consultation: ConsultationData;
}> = (props) => {
  const dispatch = useDispatch();

  const user = useSelector((state: ReduxState) => state.user);

  const AcceptConsultation = () => {
    //dispatch();
  };

  return (
    <>
      <Card style={{ marginBottom: 20 }} className="mx-auto" border="primary">
        <Card.Header style={{ background: "GoldenRod" }}>
          {props.consultation.id}
        </Card.Header>
        <Card.Body>
          <Button variant="secondary" onClick={AcceptConsultation}>
            Accept
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};
