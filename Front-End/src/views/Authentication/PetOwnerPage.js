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

import { Link } from "react-router-dom";

const PetOwnerPage = () => {
  const [state, setState] = useState({
    OFirstName: "",
    OLastName: "",
    Address: "",
    PhoneNumber: "",
    Occupation: "",
    TelephoneNo: "",
    EmailAddress:"",
    isLoading: false
  });

  const handleSubmit = () => {
    console.log(state);
    if (
      !state.OFirstName ||
      !state.OLastName ||
      !state.Address ||
      !state.PhoneNumber ||
      !state.Occupation ||
      !state.TelephoneNo ||
      !state.EmailAddress
    ) {
      alert("Please fill all requred filed...!");
    } else {
      if (state.password !== state.confirmPassword) {
        alert("Password and Confirm Password does not match, Please check");
      } else {
        axios
          .post("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petowners", {
            OFirstName: state.OFirstName,
            OLastName: state.OLastName,
            Address: state.Address,
            PhoneNumber: state.PhoneNumber,
            Occupation: state.Occupation,
            TelephoneNo: state.TelephoneNo,
            EmailAddress: state.EmailAddress
          })
          .then(res => {
            //alert(res.data.msg);
            //window.location.reload();
            localStorage.setItem("PetOwnerID", res.data._id);
            localStorage.setItem("UserTypeID", res.data._id);
            window.location.href = "/add-first-pets";
            console.log(res);
          })
          .catch(err => {
            console.log(err);
            //alert(err.response.data.error.error);
          });
      }
    }
  };

  return (
    <div className="container mt-2">
      <div className="container mt-5">
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <h3 className="text-center mb-4">Pet Owner Registration Page 👋</h3>
            <Row>
              <Col>
                <div>
                  <Row form>
                    <Col md="6" className="form-group">
                      <label htmlFor="DFirstName">Owner First Name</label>
                      <FormInput
                        id="DFirstName"
                        placeholder="First Name"
                        required
                        // valid
                        onChange={e =>
                          setState({ ...state, OFirstName: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="DLastName">Owner Last Name</label>
                      <FormInput
                        id="DLastName"
                        placeholder="Last Name"
                        required
                        // valid
                        onChange={e =>
                          setState({ ...state, OLastName: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="DPhoneNumber">Phone No</label>
                      <FormInput
                        id="DPhoneNumber"
                        type="tel"
                        placeholder="Phone No"
                        required
                        // valid
                        onChange={e =>
                          setState({ ...state, PhoneNumber: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="feAddress">Address</label>
                      <FormInput
                        id="feAddress"
                        placeholder="Address"
                        required
                        // valid
                        onChange={e =>
                          setState({ ...state, Address: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="DPhoneNumber">Telephone</label>
                      <FormInput
                        id="DPhoneNumber"
                        type="tel"
                        placeholder="Telephone"
                        required
                        // valid
                        onChange={e =>
                          setState({ ...state, TelephoneNo: e.target.value })
                        }
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <FormGroup>
                        <label htmlFor="Occupation">Occupation</label>
                        <FormInput
                          id="Occupation"
                          placeholder="Occupation"
                          required
                          // valid
                          onChange={e =>
                            setState({ ...state, Occupation: e.target.value })
                          }
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="OwnerFirstName">Email</label>
                      <FormInput
                        id="OwnerEmail"
                        placeholder="Email"
                        required
                        // valid
                        onChange={e =>
                          setState({ ...state, EmailAddress: e.target.value })
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

export default PetOwnerPage;