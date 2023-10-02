import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

import axios from "axios";
// import { withRouter } from 'react-router-dom';

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // inside the component
  // const history = withRouter();

  const handleSubmit = event => {
    setIsLoading(true);
    //Prevent page reload
    event.preventDefault();

    var { uname, password } = document.forms[0];
    const CryptoJSKey = "O8sD0AemgRU52rM0oc7U7LsFAh6Pndn8km7fTGbOFfsgymNjS0";

    if (!uname.value || !password.value) {
      alert("Please fill all required fields...!");
      setIsLoading(false);
    } else {
      axios
        .post("http://localhost:4000/api/v1/login", {
          name: CryptoJS.AES.encrypt(uname.value, CryptoJSKey).toString(),
          password: CryptoJS.AES.encrypt(password.value, CryptoJSKey).toString()
        })
        .then(res => {
          setIsLoading(false);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.name);
          localStorage.setItem("UserType", res.data.UserType);
          localStorage.setItem("UserTypeID", res.data.UserTypeID);

          res.data.UserType == "Admin"
            ? (window.location.href = "/")
            : (window.location.href = "/");
          this.props.history.push("/order-confirm");
        })
        .catch(err => {
          setIsLoading(false);
          setErrorMessages(err.response.data.error);
        });
    }
  };

  // JSX code for Login form
  const renderForm = (
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <h3 style={{ textAlign: "center" }}>Welcome to CuddlyPetz! </h3>
        <div className="form">
          <Form onSubmit={handleSubmit}>
            <div className="login-input-container">
              <FormGroup>
                <label htmlFor="username">Username</label>
                <FormInput type="text" name="uname" id="username" required />
                {/* {renderErrorMessage("uname")} */}
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">Password</label>
                <FormInput type="password" name="pass" id="password" required />
                {/* {renderErrorMessage("pass")} */}
              </FormGroup>
            </div>
            {console.log(errorMessages)}
            {errorMessages && (
              <div style={{ color: "red" }}>{`${errorMessages}`}</div>
            )}
            <Button
              className="button-container"
              type="submit"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Form>
          <div className="register-link">
            <p style={{ marginLeft: "180px", marginTop: "-10px" }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p>
              Don't have an account?{" "}
              <Link to="/petowner-register">Register here</Link>
            </p>
          </div>
        </div>
      </ListGroupItem>
    </ListGroup>
  );
  // Redirect to home page after successful login
  if (isSubmitted) {
    return <Link to="/blog-overview" />;
  }

  return (
    <div className="app" style={{ marginTop: "80px" }}>
      <div className="container mt-5">
        <Container
          className="login-container"
          style={{ marginTop: "50px", maxWidth: "1100px" }}
        >
          <Row>
            <Col sm={{ size: 4, offset: 4 }}>
              <div className="Login-form">{renderForm}</div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
