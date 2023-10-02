import React, { useState } from "react";
import axios from "axios";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  //   FormSelect,
  Button
  //   FormTextarea,
  //   InputGroupText,
  //   InputGroupAddon,
  //   InputGroup
} from "shards-react";
import CryptoJS from "crypto-js";

import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [state, setState] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    userTypeId: localStorage.getItem("PetOwnerID"),
    isLoading: false
  });

  const CryptoJSKey = "O8sD0AemgRU52rM0oc7U7LsFAh6Pndn8km7fTGbOFfsgymNjS0";

  const checkPasswordStrength = password => {
    // Define password criteria
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    // Check if the password meets the criteria
    const isStrongPassword =
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigits &&
      hasSpecialChars;

    return isStrongPassword;
  };

  const handleSubmit = () => {
    if (
      !state.name ||
      !state.password ||
      !state.confirmPassword ||
      !state.email ||
      !state.userTypeId
    ) {
      alert("Please fill all requred filed...!");
    } else {
      if (state.password !== state.confirmPassword) {
        alert("Password and Confirm Password does not match, Please check");
      } else {
        if (checkPasswordStrength(state.password)) {
          axios
            .post(
              "https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/register",
              {
                // name: CryptoJS.AES.encrypt(state.name, CryptoJSKey).toString(),
                // password: CryptoJS.AES.encrypt(state.password, CryptoJSKey).toString(),
                // email: CryptoJS.AES.encrypt(state.email, CryptoJSKey).toString(),
                name: state.name,
                password: state.password,
                email: state.email,
                UserType: "PetOwner",
                UserTypeID: state.userTypeId
              }
            )
            .then(res => {
              alert(res.data.msg);
              localStorage.clear();
              // window.location.href = "/login";
              console.log(res);
            })
            .catch(err => {
              console.log(err);
              alert(err.response.data.error.error);
            });
        } else {
          alert(
            "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character."
          );
        }
      }
    }
  };

  return (
    <div className="container mt-2">
      <div className="container mt-5">
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <h3 className="text-center mb-4">User Registration Page</h3>
            <Row>
              <Col>
                <div>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="OwnerUserName">User Name</label>
                      <FormInput
                        id="OwnerUserName"
                        placeholder="User Name"
                        required
                        // valid
                        onChange={e =>
                          setState({ ...state, name: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="OwnerFirstName">Email</label>
                      <FormInput
                        id="OwnerEmail"
                        placeholder="Email"
                        required
                        // valid
                        onChange={e =>
                          setState({ ...state, email: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="12" className="form-group">
                      <label htmlFor="name">User ID</label>
                      <FormInput
                        disabled
                        id="name"
                        type="text"
                        placeholder="User ID"
                        required
                        onChange={e =>
                          setState({ ...state, userTypeId: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="password">Password</label>
                      <FormInput
                        id="password"
                        type="password"
                        required
                        onChange={e =>
                          setState({ ...state, password: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group mb-5">
                      <label htmlFor="password">Confirm Password</label>
                      <FormInput
                        id="password"
                        type="password"
                        required
                        onChange={e =>
                          setState({
                            ...state,
                            confirmPassword: e.target.value
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <div onClick={() => handleSubmit()}>
                      <Button type="submit">Register</Button>
                    </div>
                  </Row>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default RegistrationPage;
