import React, {useState, useEffect} from "react";
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
  
  const [OFirstName, setOFirstName] = useState("");
  const [OLastName, setOLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [TelephoneNo, setTelephoneNo] = useState("");
  const [EmailAddress, setEmailAddress] = useState("");

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
      fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petowners/`+localStorage.getItem("UserTypeID"))
      .then(response => response.json())
      .then(data => {
        setOFirstName(data.OFirstName);
        setOLastName(data.OLastName);
        setAddress(data.Address);
        setPhoneNumber(data.PhoneNumber);
        setOccupation(data.Occupation);
        setTelephoneNo(data.TelephoneNo);
        setEmailAddress(data.EmailAddress);
      })
      .catch(error => console.error(error));
  },[]);

  const handleSubmit = () => {
    //console.log(state);
    if (
      !OFirstName ||
      !OLastName ||
      !Address ||
      !PhoneNumber ||
      !Occupation ||
      !TelephoneNo ||
      !EmailAddress
    ) {
      alert("Please fill all requred filed...!");
    } else {
        const formData = {
          OFirstName: OFirstName,
          OLastName: OLastName,
          Address: Address,
          PhoneNumber: PhoneNumber,
          Occupation: Occupation,
          TelephoneNo: TelephoneNo,
          EmailAddress: EmailAddress
        };

        fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petowners/`+ localStorage.getItem("UserTypeID"), {
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
                      <label htmlFor="DFirstName">Owner First Name</label>
                      <FormInput
                        id="DFirstName"
                        placeholder="First Name"
                        required
                        value={OFirstName}
                        onChange={e => setOFirstName(e.target.value)}
                      />
                    </Col>
                    {/* Last Name */}
                    <Col md="6" className="form-group">
                      <label htmlFor="DLastName">Owner Last Name</label>
                      <FormInput
                        id="DLastName"
                        placeholder="Last Name"
                        required
                        value={OLastName}
                        onChange={e => setOLastName(e.target.value)}
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
                        value={PhoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                      />
                    </Col>
                    {/* Password */}
                    <Col md="6" className="form-group">
                      <label htmlFor="DPhoneNumber">Telephone</label>
                      <FormInput
                        id="DPhoneNumber"
                        type="tel"
                        placeholder="Telephone"
                        required
                        value={TelephoneNo}
                        onChange={e => setTelephoneNo(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <FormGroup>
                  <label htmlFor="feAddress">Address</label>
                      <FormInput
                        id="feAddress"
                        placeholder="Address"
                        required
                        value={Address}
                        onChange={e => setAddress(e.target.value)}
                      />
                  </FormGroup>
                  <Row form>
                    {/* City */}
                    <Col md="6" className="form-group">
                      <FormGroup>
                        <label htmlFor="Occupation">Occupation</label>
                        <FormInput
                          id="Occupation"
                          placeholder="Occupation"
                          required
                          value={Occupation}
                          onChange={e => setOccupation(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    {/* State */}
                    <Col md="6" className="form-group">
                      <label htmlFor="OwnerFirstName">Email</label>
                      <FormInput
                        id="OwnerEmail"
                        placeholder="Email"
                        required
                        value={EmailAddress}
                        onChange={e => setEmailAddress(e.target.value)}
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