import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import TopicData from "../../data/server/Topic/TopicData";
import { addTopic, updateTopic } from "../../store/Topic";
import { createNewTopic, editTopic } from "../../api/Topic";
import ModalModel from "../../data/ModalModel";
import UserData from "../../data/server/User/UserData";
import DeadlineData from "../../data/server/Topic/DeadlineData";
import QuestionData from "../../data/server/Topic/QuestionData";
import ConsultationData from "../../data/server/Topic/ConsultationData";

export const TopicModal: FunctionComponent<{
  model: ModalModel;
  isNew: boolean;
  topic?: TopicData;
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
    const topicToSend = {
      id: props.topic ? props.topic.id : "fake_id",
      name: data.name,
      description: data.description,
      owner: props.topic ? props.topic.owner : ({} as UserData),
      questions: props.topic ? props.topic.questions : ([] as QuestionData[]),
      deadlines: props.topic ? props.topic.deadlines : ([] as DeadlineData[]),
      consultation: props.topic
        ? props.topic.consultation
        : ([] as ConsultationData[]),
    };

    if (props.isNew) {
      dispatch(
        addTopic({
          newTopic: topicToSend,
        })
      );
      dispatch(createNewTopic(topicToSend));
    } else {
      dispatch(editTopic(topicToSend));
      dispatch(
        updateTopic({
          topicId: props.topic!.id,
          updatedTopicId: topicToSend,
        })
      );
    }
    handleClose();
  });

  var modalTitle = props.isNew ? "Create a new Topic" : "Edit the Topic";

  var submitButton = props.isNew ? (
    <Button
      variant="outline-success"
      className="border border-success"
      type="submit"
    >
      Create Topic
    </Button>
  ) : (
    <Button
      variant="outline-primary"
      className="border border-primary"
      type="submit"
    >
      Save Changes
    </Button>
  );

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Group controlId="formTopicName">
            <Form.Label>Topic Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              defaultValue={props.topic ? props.topic.name : ""}
              ref={register}
              isInvalid={!!errors.name}
              placeholder="Name of your Topic..."
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

          <Form.Group controlId="formTopicDescription">
            <Form.Label>Topic Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              defaultValue={props.topic ? props.topic.description : ""}
              ref={register}
              isInvalid={!!errors.name}
              placeholder="Description of your Topic..."
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
