import React, { FunctionComponent } from "react";
import { Card, Col } from "react-bootstrap";
import ReplyData from "../../../../data/server/Topic/ReplyData";

export const Reply: FunctionComponent<{ reply: ReplyData }> = (props) => {
  return (
    <>
      <Card style={{ marginBottom: 20 }} className="mx-auto" border="primary">
        <Card.Header style={{ background: "GoldenRod" }}>
          {props.reply.owner.userName}
        </Card.Header>
        <Card.Body>{props.reply.text}</Card.Body>
      </Card>
    </>
  );
};
