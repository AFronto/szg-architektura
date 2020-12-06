import React, { FunctionComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import ModalModel from "../../../../data/ModalModel";
import ConsultationData from "../../../../data/server/Topic/ConsultationData";

export const ConsultationModal: FunctionComponent<{
  model: ModalModel;
  isNew: boolean;
  parentTopicId: string;
  consultation?: ConsultationData;
}> = (props) => {
  const { show, handleClose } = props.model;
  const dispatch = useDispatch();

  const schema = yup.object({
    description: yup.string().required(),
    date: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = handleSubmit((data) => {
    // const deadlineToSend = {
    //   id: props.deadline ? props.deadline.id : "fake_id",
    //   date: new Date(data.date),
    //   description: data.description,
    //   link: props.deadline ? props.deadline.link : "",
    //   isDone: props.deadline ? props.deadline.isDone : false,
    // };

    // if (props.isNew) {
    //   dispatch(
    //     addDeadline({
    //       parentTopicId: props.parentTopicId,
    //       newDeadline: deadlineToSend,
    //     })
    //   );
    // } else {
    //   dispatch(
    //     updateDeadline({
    //       parentTopicId: props.parentTopicId,
    //       updatedDeadline: deadlineToSend,
    //     })
    //   );
    // }
    handleClose();
  });

  var modalTitle = props.isNew
    ? "Add a new Consultation"
    : "Reschedule consultation";

  var submitButton = props.isNew ? (
    <Button
      variant="outline-success"
      className="border border-success"
      type="submit"
    >
      Schedule Consultation
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
            <Form.Label>Consultation Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              defaultValue={props.consultation ? props.consultation.id : ""}
              ref={register}
              isInvalid={!!errors.description}
              placeholder="Describe the task"
            />
            <Form.Control.Feedback type="invalid">
              <h6>
                {errors.description
                  ? Array.isArray(errors.description)
                    ? errors.description[0].message
                    : errors.description.message
                  : ""}
              </h6>
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDeadlineDate">
            <Form.Label>Deadline Date</Form.Label>
            <Form.Control name="date" type="text" ref={register} />
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
