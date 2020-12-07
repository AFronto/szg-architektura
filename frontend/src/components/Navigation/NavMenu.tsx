import React, { FunctionComponent } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { isLoggedIn, logOut } from "../../api/Auth";
import { Link } from "react-router-dom";
import { ReduxState } from "../../store";
import { useSelector, useDispatch } from "react-redux";

export const NavMenu: FunctionComponent = () => {
  const activePath = useSelector(
    (state: ReduxState) => state.router.location.pathname
  );

  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.user);
  const topic = useSelector((state: ReduxState) => state.topics).find(
    (t) => t.studentOnTopic.length > 0 && t.studentOnTopic[0].id === user.id
  )!;

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="sm">
      <>
        <Navbar.Brand className="ml-3" href="/">
          Consultation App
          {user.userName ? " logged in as: " + user.userName : ""}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {isLoggedIn() ? (
            <Nav className="ml-auto mr-3">
              <Link
                className={
                  ["/", "/topics"].includes(activePath)
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/topics"
              >
                All Topics
              </Link>
              {!user.isTeacher ? (
                topic !== undefined ? (
                  <Link
                    className={
                      activePath === `/topics/${topic.id}`
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={`/topics/${topic.id}`}
                  >
                    My Topic
                  </Link>
                ) : (
                  <Link
                    className={
                      activePath === `/no_topic`
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={`/no_topic`}
                  >
                    My Topic
                  </Link>
                )
              ) : (
                <Link
                  className={
                    activePath === `/my_topics` ? "nav-link active" : "nav-link"
                  }
                  to={`/my_topics`}
                >
                  My Topics
                </Link>
              )}
              <Nav.Link onClick={() => dispatch(logOut())}>Log Out</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ml-auto mr-3">
              <Link
                className={
                  activePath === "/register" ? "nav-link active" : "nav-link"
                }
                to="/register"
              >
                Register
              </Link>
              <Link
                className={
                  activePath === "/login" ? "nav-link active" : "nav-link"
                }
                to="/login"
              >
                Log In
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </>
    </Navbar>
  );
};
