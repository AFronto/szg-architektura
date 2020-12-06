import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "react-rainbow-components";
import { Typeahead } from "react-bootstrap-typeahead";
import ModalModel from "../../../../data/ModalModel";
import ConsultationData from "../../../../data/server/Topic/ConsultationData";
import QuestionData from "../../../../data/server/Topic/QuestionData";
import { addConsultation, updateConsultation } from "../../../../store/Topic";
import { ReduxState } from "../../../../store";
import {
  createNewConsultation,
  updateExistingConsultation,
} from "../../../../api/Topic/ConsultationAPI";

export const ConsultationModal: FunctionComponent<{
  model: ModalModel;
  isNew: boolean;
  parentTopicId: string;
  questions: QuestionData[];
  consultation?: ConsultationData;
}> = (props) => {
  const { show, handleClose } = props.model;
  const dispatch = useDispatch();

  var questionsWithNormalizedText = props.questions
    .map((question) => {
      return {
        ...question,
        text:
          question.text.substr(0, 30) +
          (question.text.length > 30 ? "..." : ""),
      };
    })
    .filter((q) => !q.isClosed);
  const [selected, setSelected] = useState(questionsWithNormalizedText);
  useEffect(() => {
    questionsWithNormalizedText = props.questions
      .map((question) => {
        return {
          ...question,
          text:
            question.text.substr(0, 30) +
            (question.text.length > 30 ? "..." : ""),
        };
      })
      .filter((q) => !q.isClosed);
    setSelected(questionsWithNormalizedText);
  }, [props.questions]);

  const user = useSelector((state: ReduxState) => state.user);

  const { handleSubmit } = useForm({});

  const [consultationDate, setConsultationDate] = useState(new Date());

  const onSubmit = handleSubmit((data) => {
    const consultationToSend = {
      id: props.consultation ? props.consultation.id : "fake_id",
      date: consultationDate.toString(),
      questions: selected.map(
        (sq) => props.questions.find((q) => q.id === sq.id)!
      ),
      status: "pending",
      lastModified: user.isTeacher ? "teacher" : "student",
    };

    if (props.isNew) {
      dispatch(
        addConsultation({
          parentTopicId: props.parentTopicId,
          newConsultation: consultationToSend,
        })
      );
      dispatch(createNewConsultation(props.parentTopicId, consultationToSend));
    } else {
      const oldConsultation = props.consultation!;
      dispatch(
        updateConsultation({
          parentTopicId: props.parentTopicId,
          updatedConsultation: consultationToSend,
        })
      );
      dispatch(
        updateExistingConsultation(
          props.parentTopicId,
          oldConsultation,
          consultationToSend
        )
      );
    }
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
          <Form.Group controlId="formDeadlineDate">
            <Form.Label>Consultation Date</Form.Label>
            <DatePicker
              value={consultationDate}
              onChange={(value) => setConsultationDate(value)}
            />
          </Form.Group>
          {props.isNew && (
            <Form.Group controlId="formQuestionSelection">
              <Form.Label>Questions</Form.Label>
              <div
                className="clearfix"
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                <Typeahead
                  id="question-selection"
                  labelKey="text"
                  multiple={true}
                  defaultSelected={questionsWithNormalizedText}
                  options={questionsWithNormalizedText}
                  onChange={setSelected}
                  placeholder="Choose a question..."
                />
              </div>
            </Form.Group>
          )}

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
