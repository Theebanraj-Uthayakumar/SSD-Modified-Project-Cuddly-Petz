import React, { useState, useEffect } from "react";
import axios from "axios";

import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";

const UserAccountDetails = () => {
  // const [state, setState] = useState({
  //   OFirstName: "",
  //   OLastName: "",
  //   Address: "",
  //   PhoneNumber: "",
  //   Occupation: "",
  //   TelephoneNo: "",
  //   EmailAddress:"",
  //   isLoading: false
  // });

  const [HName, setHName] = useState("");
  const [HAddress, setHAddress] = useState("");
  const [HPhoneNumber, setHPhoneNumber] = useState("");
  const [HEmailAddress, setHEmailAddress] = useState("");
  const [HWebsite, setHWebsite] = useState("");
  const [HOpenTime, setHOpenTime] = useState("");
  const [HGoogleLocation, setHGoogleLocation] = useState("");

  useEffect(() => {
    // axios
    //   .get(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petowners/`+localStorage.getItem("UserTypeID"))
    //   .then(data => {
    //     setOFirstName(data.OFirstName);
    //     setOLastName(data.OLastName);
    //     setAddress(data.Address);
    //     setPhoneNumber(data.PhoneNumber);
    //     setOccupation(data.Occupation);
    //     setTelephoneNo(data.TelephoneNo);
    //     setEmailAddress(data.EmailAddress);
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    fetch(
      `https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pethospital/` +
        localStorage.getItem("UserTypeID")
    )
      .then(response => response.json())
      .then(data => {
        setHName(data.HName);
        setHAddress(data.HAddress);
        setHPhoneNumber(data.HPhoneNumber);
        setHEmailAddress(data.HEmailAddress);
        setHWebsite(data.HWebsite);
        setHOpenTime(data.HOpenTime);
        setHGoogleLocation(data.HGoogleLocation);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = () => {
    //console.log(state);
    if (
      !HName ||
      !HAddress ||
      !HPhoneNumber ||
      !HEmailAddress ||
      !HWebsite ||
      !HOpenTime ||
      !HGoogleLocation
    ) {
      alert("Please fill all requred filed...!");
    } else {
      const formData = {
        HName: HName,
        HAddress: HAddress,
        HPhoneNumber: HPhoneNumber,
        HEmailAddress: HEmailAddress,
        HWebsite: HWebsite,
        HOpenTime: HOpenTime,
        HGoogleLocation: HGoogleLocation
      };

      fetch(
        `https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pethospital/` +
          localStorage.getItem("UserTypeID"),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert("Successfully updated");
          window.location.reload();
        })
        .catch(error => {
          console.error("Error updating profile record:", error);
        });
    }
  };

  return (
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0"></h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row form>
                  {/* First Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="DFirstName">Hospital Name</label>
                    <FormInput
                      id="DFirstName"
                      placeholder="First Name"
                      required
                      value={HName}
                      onChange={e => setHName(e.target.value)}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="DLastName">Address</label>
                    <FormInput
                      id="DLastName"
                      placeholder="Last Name"
                      required
                      value={HAddress}
                      onChange={e => setHAddress(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="DPhoneNumber">Phone No</label>
                    <FormInput
                      id="DPhoneNumber"
                      type="tel"
                      placeholder="Phone No"
                      required
                      value={HPhoneNumber}
                      onChange={e => setHPhoneNumber(e.target.value)}
                    />
                  </Col>
                  {/* Password */}
                  <Col md="6" className="form-group">
                    <label htmlFor="DPhoneNumber">EmailAddress</label>
                    <FormInput
                      id="DPhoneNumber"
                      type="tel"
                      placeholder="Telephone"
                      required
                      value={HEmailAddress}
                      onChange={e => setHEmailAddress(e.target.value)}
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="feAddress">Website</label>
                  <FormInput
                    id="feAddress"
                    placeholder="Address"
                    required
                    value={HWebsite}
                    onChange={e => setHWebsite(e.target.value)}
                  />
                </FormGroup>
                <Row form>
                  {/* City */}
                  <Col md="6" className="form-group">
                    <FormGroup>
                      <label htmlFor="Occupation">OpenTime</label>
                      <FormInput
                        id="Occupation"
                        placeholder="Occupation"
                        required
                        value={HOpenTime}
                        onChange={e => setHOpenTime(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/* State */}
                  <Col md="6" className="form-group">
                    <label htmlFor="OwnerFirstName">GoogleLocation</label>
                    <FormInput
                      id="OwnerEmail"
                      placeholder="Email"
                      required
                      value={HGoogleLocation}
                      onChange={e => setHGoogleLocation(e.target.value)}
                    />
                  </Col>
                </Row>
                <div>
                  <Button onClick={() => handleSubmit()}>Update</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default UserAccountDetails;
