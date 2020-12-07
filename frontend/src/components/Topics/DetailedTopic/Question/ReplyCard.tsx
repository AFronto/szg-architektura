import React, { FunctionComponent } from "react";
import { Card } from "react-bootstrap";
import ReplyData from "../../../../data/server/Topic/ReplyData";

export const Reply: FunctionComponent<{ reply: ReplyData }> = (props) => {
  return (
    <>
      <Card style={{ marginBottom: 20 }} className="mx-auto" border="primary">
        <Card.Header style={{ background: "Moccasin" }}>
          {props.reply.owner.userName}:
          {new Date(props.reply.creationDate).toLocaleString()}
        </Card.Header>
        <Card.Body>{props.reply.text}</Card.Body>
      </Card>
    </>
  );
};
