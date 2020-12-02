import * as React from "react";
import { Container } from "react-bootstrap";

export default (props: { children?: React.ReactNode }) => (
  <Container className="h-100">
    <div className="h-100" style={{ paddingTop: 100 }}>
      {props.children}
    </div>
  </Container>
);
