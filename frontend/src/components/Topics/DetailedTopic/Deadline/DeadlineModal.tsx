import React, { useState } from "react";
import { FunctionComponent } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { DatePicker } from "react-rainbow-components";
import ModalModel from "../../../../data/ModalModel";
import DeadlineData from "../../../../data/server/Topic/DeadlineData";
import { addDeadline, updateDeadline } from "../../../../store/Topic";
import {
  createNewDeadline,
  updateExistingDeadline,
} from "../../../../api/Topic";

export const DeadlineModal: FunctionComponent<{
  model: ModalModel;
  isNew: boolean;
  parentTopicId: string;
  deadline?: DeadlineData;
}> = (props) => {
  const { show, handleClose } = props.model;
  const dispatch = useDispatch();

  const schema = yup.object({
    description: yup.string().required(),
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const [deadlineDate, setDeadlineDate] = useState(new Date());

  const onSubmit = handleSubmit((data) => {
    const deadlineToSend = {
      id: props.deadline ? props.deadline.id : "fake_id",
      date: deadlineDate.toString(),
      description: data.description,
      link: props.deadline ? props.deadline.link : "",
      isDone: props.deadline ? props.deadline.isDone : false,
    };

    if (props.isNew) {
      dispatch(
        addDeadline({
          parentTopicId: props.parentTopicId,
          newDeadline: deadlineToSend,
        })
      );
      dispatch(createNewDeadline(props.parentTopicId, deadlineToSend));
    } else {
      var oldDeadline = props.deadline!;
      dispatch(
        updateDeadline({
          parentTopicId: props.parentTopicId,
          deadlineId: props.deadline!.id,
          updatedDeadline: deadlineToSend,
        })
      );
      dispatch(
        updateExistingDeadline(props.parentTopicId, oldDeadline, deadlineToSend)
      );
    }
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
            <DatePicker
              value={deadlineDate}
              onChange={(value) => setDeadlineDate(value)}
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
