import { Form, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/usersRedux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../common/PageTitle/PageTitle";
import Button from "../../common/Button/Button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError'

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    };

    setStatus("loading");
    fetch(`${API_URL}/auth/login`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus("success");
          return res.json();
        } else if (res.status === 400) {
          setStatus("clientError");
        } else {
          setStatus("serverError");
        }
      })
      .then((user) => {
        if (user) {
          dispatch(logIn({ user }));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        setStatus("serverError");
      });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="col-10 col-sm-8 col-lg-4 mx-auto text-center"
    >
      <PageTitle title="Let's sign in!" />
      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully logged in!</p>
        </Alert>
      )}
      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error, ty again!</p>
        </Alert>
      )}
      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Incorrect data</Alert.Heading>
          <p>Login or password are incorrect</p>
        </Alert>
      )}
      {status === "loading" && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">loading...</span>
        </Spinner>
      )}
      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>login</Form.Label>
        <Form.Control
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          placeholder="Enter login"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button type="submit" color="cool-main" content="submit" />
    </Form>
  );
};

export default Login;
