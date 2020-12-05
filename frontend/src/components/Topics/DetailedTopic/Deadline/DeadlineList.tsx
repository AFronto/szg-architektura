import React, { FunctionComponent } from "react";
import { Col, Row } from "react-bootstrap";
import * as yup from "yup";
import DeadlineData from "../../../../data/server/Topic/DeadlineData";
import { DeadlineCard } from "./DeadlineCard";

export const DeadlineList: FunctionComponent<{
  deadlines: DeadlineData[];
}> = (props) => {
  const schema = yup.object({
    name: yup.string().required(),
  });

  //   const dispatch = useDispatch();

  //   const { handleSubmit, errors } = useForm({
  //     validationSchema: schema,
  //   });

  //   const onSubmit = handleSubmit((data) => {
  //     const replyToSend = {
  //       id: data.id,
  //       owner: data.owner,
  //       text: data.questions,
  //     };

  //     dispatch(
  //       addReply({
  //         newReply: replyToSend,
  //       })
  //     );
  //     //dispatch(createNewReply(replyToSend));
  //   });

  return (
    <>
      <Row>
        {props.deadlines.map((deadline) => (
          <Col xs={12}>
            <DeadlineCard deadline={deadline} />
          </Col>
        ))}
      </Row>
      {/* <Row>
        <Col md={12} style={{ marginTop: 40 }}>
          <Form noValidate onSubmit={onSubmit}>
            <Form.Group controlId="formQuestion">
              <Form.Control placeholder="Enter your question" />
            </Form.Group>

            <Button variant="secondary" type="submit">
              Post your question!
            </Button>
          </Form>
        </Col>
      </Row> */}
    </>
  );
};
