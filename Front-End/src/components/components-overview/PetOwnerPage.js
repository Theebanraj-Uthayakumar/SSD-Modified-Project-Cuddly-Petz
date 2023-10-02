import React, { useState, useEffect } from "react";
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

  const [fname, setOFirstName] = useState("");
  const [lname, setOLastName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setPhoneNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [telephone, setTelephoneNo] = useState("");

  const ID = window.sessionStorage.getItem("POID");

  useEffect(() => {
    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petowners/${ID}`)
      .then(response => response.json())
      .then(data => {
        setOFirstName(data.OFirstName);
        setOLastName(data.OLastName);
        setAddress(data.Address);
        setPhoneNumber(data.PhoneNumber);
        setOccupation(data.Occupation);
        setTelephoneNo(data.TelephoneNo);
      })
      .catch(error => console.error(error));
  }, [ID]);

  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = {
      OFirstName: fname,
      OLastName: lname,
      Address: address,
      PhoneNumber: number,
      Occupation: occupation,
      TelephoneNo: telephone
    };

    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petowners/${ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Successfully updated");
      })
      .catch(error => {
        console.error("Error updating profile record:", error);
      });
  };

  return (
    <div className="container mt-2">
      <div className="container mt-5">
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <h3 className="text-center mb-4">Update Pet Owner Profile Page 👋</h3>
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
                        value={fname}
                        onChange={e => setOFirstName(e.target.value)}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="DLastName">Owner Last Name</label>
                      <FormInput
                        id="DLastName"
                        placeholder="Last Name"
                        required
                        // valid
                        value={lname}
                        onChange={e => setOLastName(e.target.value)}
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
                        value={address}
                        onChange={e => setPhoneNumber(e.target.value)}
                      />
                    </Col>
                    <Col md="6" className="form-group">
                      <label htmlFor="feAddress">Address</label>
                      <FormInput
                        id="feAddress"
                        placeholder="Address"
                        required
                        // valid
                        value={address}
                        onChange={e => setAddress(e.target.value)}
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
                        value={telephone}
                        onChange={e => setTelephoneNo(e.target.value)}
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
                          value={occupation}
                          onChange={e => setOccupation(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <div onClick={() => handleFormSubmit()}>
                      <Button type="submit">Update</Button>
                    </div>
                  </Row>
                </div>
                {/* <div style={{ textAlign: "center" }}>
                  <div className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </div> */}
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default PetOwnerPage;