import { Form, Alert } from "react-bootstrap";
import { useState } from "react";
import { API_URL } from "../../../config";
import PageTitle from "../../common/PageTitle/PageTitle";
import Button from "../../common/Button/Button";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("login", login);
    fd.append("password", password);
    fd.append("phone", phone);
    fd.append("avatar", avatar);

    const options = {
      method: "POST",
      body: fd,
    };

    setStatus("loading");
    fetch(`${API_URL}/auth/register`, options)
      .then((res) => {
        if (res.status === 201) {
          setStatus("success");
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 409) {
          setStatus("loginError");
        } else {
          setStatus("serverError");
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
      <PageTitle title="Let's sign up!" />
      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered! You can now log in</p>
          <Link to="/login">
            <Button color="warm-main" content="go to sign in page" />
          </Link>
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
          <Alert.Heading>Not enough data</Alert.Heading>
          <p>You have to fill all the fields</p>
        </Alert>
      )}
      {status === "loginError" && (
        <Alert variant="warning">
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login</p>
        </Alert>
      )}
      {status === "loading" && <LoadingSpinner />}
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
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>phone</Form.Label>
        <Form.Control
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          placeholder="Enter phone number"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>avatar</Form.Label>
        <Form.Control
          onChange={(e) => setAvatar(e.target.files[0])}
          type="file"
        />
      </Form.Group>
      <Button type="submit" color="cool-main" content="submit" />
    </Form>
  );
};

export default Register;
