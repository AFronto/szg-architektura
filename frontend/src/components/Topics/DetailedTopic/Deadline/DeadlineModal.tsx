import React from "react";
import { FunctionComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import ModalModel from "../../../../data/ModalModel";
import DeadlineData from "../../../../data/server/Topic/DeadlineData";

export const DeadlineModal: FunctionComponent<{
  model: ModalModel;
  isNew: boolean;
  deadline?: DeadlineData;
}> = (props) => {
  const { show, handleClose } = props.model;
  const dispatch = useDispatch();

  const schema = yup.object({
    name: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = handleSubmit((data) => {
    const deadlineToSend = {
      id: props.deadline ? props.deadline.id : "fake_id",
      date: props.deadline ? props.deadline.date : new Date(Date.now()),
      description: data.description,
      link: props.deadline ? props.deadline.link : "",
      isDone: props.deadline ? props.deadline.isDone : false,
    };

    // if (props.isNew) {
    //   dispatch(
    //     addTopic({
    //       newTopic: topicToSend,
    //     })
    //   );
    //   dispatch(createNewTopic(topicToSend));
    // } else {
    //   dispatch(editTopic(topicToSend));
    //   dispatch(
    //     updateTopic({
    //       topicId: props.topic!.id,
    //       updatedTopicId: topicToSend,
    //     })
    //   );
    // }
    handleClose();
  });

  var modalTitle = props.isNew ? "Add a new deadline" : "Edit the deadline";

  var submitButton = props.isNew ? (
    <Button
      variant="outline-success"
      className="border border-success"
      type="submit"
    >
      Create Deadline
    </Button>
  ) : (
    <Button
      variant="outline-primary"
      className="border border-primary"
      type="submit"
    >
      Save changes
    </Button>
  );

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group controlId="formDeadlineDescription">
            <Form.Label>Deadline Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              defaultValue={props.deadline ? props.deadline.description : ""}
              ref={register}
              isInvalid={!!errors.name}
              placeholder="Describe the task"
            />
            <Form.Control.Feedback type="invalid">
              <h6>
                {errors.name
                  ? Array.isArray(errors.name)
                    ? errors.name[0].message
                    : errors.name.message
                  : ""}
              </h6>
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDeadlineDate">
            <Form.Label>Deadline Date</Form.Label>
            <Form.Control
              name="date"
              type="text"
              defaultValue={
                props.deadline
                  ? props.deadline.date.toDateString()
                  : new Date(Date.now()).toDateString()
              }
              ref={register}
              isInvalid={!!errors.name}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            {submitButton}
            <Button
              variant="outline-danger"
              className="border border-danger ml-2"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};
