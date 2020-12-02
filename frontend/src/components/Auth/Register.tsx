import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  Card,
  Form,
  Col,
  Button,
  Row,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { ReduxState } from "../../store";
import React, { FunctionComponent, useState } from "react";
import { isLoggedIn } from "../../api/Auth";
import { createNewAccount } from "../../api/Auth";
import { clearError } from "../../store/Errors";

export const RegisterScreen: FunctionComponent = () => {
  const schema = yup.object({
    email: yup.string().email().required(),
    userName: yup.string().required(),
    password: yup.string().min(8).required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match"),
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(
      createNewAccount({
        email: data.email,
        userName: data.userName,
        password: data.password,
        repeatPassword: data.passwordConfirmation,
        isTeacher: isTeacher,
      })
    );
  });

  const onChangeOfCredentials = () => {
    dispatch(clearError({ name: "registrationCredentialError" }));
  };

  const errorsFromServer = useSelector((state: ReduxState) => state.errors);

  const [isTeacher, setIsTeacher] = useState(false);

  const radios = [
    { name: "Student", value: false },
    { name: "Teacher", value: true },
  ];

  return isLoggedIn() ? (
    <Redirect
      to={{
        pathname: "/topics",
      }}
    />
  ) : (
    <Row className="h-100 align-items-center justify-content-center">
      <Card
        style={{ width: "18rem", marginTop: 100, marginBottom: 100 }}
        bg={"dark"}
        text={"white"}
      >
        <Card.Header as="h4">Create a new Account!</Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={onSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="emailField">
                <Form.Label>
                  <h5>Email:</h5>
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  name="email"
                  onChange={onChangeOfCredentials}
                  ref={register}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  <h6>
                    {errors.email
                      ? Array.isArray(errors.email)
                        ? errors.email[0].message
                        : errors.email.message
                      : ""}
                  </h6>
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="userNameField">
                <Form.Label>
                  <h5>User Name:</h5>
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="text"
                  name="userName"
                  onChange={onChangeOfCredentials}
                  ref={register}
                  isInvalid={!!errors.userName}
                />
                <Form.Control.Feedback type="invalid">
                  <h6>
                    {errors.userName
                      ? Array.isArray(errors.userName)
                        ? errors.userName[0].message
                        : errors.userName.message
                      : ""}
                  </h6>
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="passwordField">
                <Form.Label>
                  <h5>Password:</h5>
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  name="password"
                  onChange={onChangeOfCredentials}
                  ref={register}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  <h6>
                    {errors.password
                      ? Array.isArray(errors.password)
                        ? errors.password[0].message
                        : errors.password.message
                      : ""}
                  </h6>
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="passwordConfirmationField">
                <Form.Label>
                  <h5>Repeat your password:</h5>
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  name="passwordConfirmation"
                  onChange={onChangeOfCredentials}
                  ref={register}
                  isInvalid={!!errors.passwordConfirmation}
                />
                <Form.Control.Feedback type="invalid">
                  <h6>
                    {errors.passwordConfirmation
                      ? Array.isArray(errors.passwordConfirmation)
                        ? errors.passwordConfirmation[0].message
                        : errors.passwordConfirmation.message
                      : ""}
                  </h6>
                </Form.Control.Feedback>
                {errors.passwordConfirmation
                  ? ""
                  : errorsFromServer["registrationCredentialError"] !==
                      undefined && (
                      <h6 className="mt-2 text-danger">
                        {errorsFromServer["registrationCredentialError"]}
                      </h6>
                    )}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="isTeacherField">
                <ButtonGroup toggle>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      type="radio"
                      variant="primary"
                      value={radio.value}
                      onChange={() => setIsTeacher(radio.value)}
                      checked={radio.value === isTeacher}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
            </Form.Row>

            <Button type="submit" size="lg" block style={{ marginTop: 10 }}>
              Create Account
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Row>
  );
};
