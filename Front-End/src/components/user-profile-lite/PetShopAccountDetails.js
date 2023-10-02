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

const PetShopAccountDetails = () => {
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

  const [shopname, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setGoogleLocation] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mobile, setMobile] = useState("");
  const [opentime, setOpenTime] = useState("");
  const [closetime, setCloseTime] = useState("");

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
      `https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petshop/` +
        localStorage.getItem("UserTypeID")
    )
      .then(response => response.json())
      .then(data => {
        setShopName(data.ShopName);
        setAddress(data.Address);
        setGoogleLocation(data.GoogleLocation);
        setEmail(data.Email);
        setTelephone(data.Telephone);
        setMobile(data.Mobile);
        setOpenTime(data.OpenTime);
        setCloseTime(data.CloseTime);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = () => {
    //console.log(state);
    if (
      !shopname ||
      !address ||
      !location ||
      !email ||
      !telephone ||
      !mobile ||
      !opentime ||
      !closetime
    ) {
      alert("Please fill all requred filed...!");
    } else {
      const formData = {
        ShopName: shopname,
        Address: address,
        GoogleLocation: location,
        Email: email,
        Telephone: telephone,
        Mobile: mobile,
        OpenTime: opentime,
        CloseTime: closetime
      };

      fetch(
        `https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petshop/` +
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
                    <label htmlFor="Date">Shop Name</label>
                    <FormInput
                      id="ShopName"
                      type="text"
                      value={shopname}
                      onChange={e => setShopName(e.target.value)}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col md="6" className="form-group">
                    <label htmlFor="Date">Shop Address</label>
                    <FormInput
                      id="Address"
                      type="text"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col md="6" className="form-group">
                    <label htmlFor="Date">Google Location</label>
                    <FormInput
                      id="GoogleLocation"
                      type="url"
                      value={location}
                      onChange={e => setGoogleLocation(e.target.value)}
                    />
                  </Col>
                  {/* Password */}
                  <Col md="6" className="form-group">
                    <label htmlFor="Email">Email</label>
                    <FormInput
                      id="Email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="Telephone">Telephone No</label>
                  <FormInput
                    id="Telephone"
                    type="tel"
                    placeholder="Telephone No"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                  />
                </FormGroup>
                <Row form>
                  {/* City */}
                  <Col md="6" className="form-group">
                    <FormGroup>
                      <label htmlFor="Mobile">Mobile No</label>
                      <FormInput
                        id="Mobile"
                        type="tel"
                        placeholder="Mobile No"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  {/* State */}
                  <Col md="6" className="form-group">
                    <label htmlFor="OpenTime">Open Time</label>
                    <FormInput
                      id="OpenTime"
                      type="time"
                      value={opentime}
                      onChange={e => setOpenTime(e.target.value)}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="CloseTime">Close Time</label>
                    <FormInput
                      id="CloseTime"
                      type="time"
                      value={closetime}
                      onChange={e => setCloseTime(e.target.value)}
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

export default PetShopAccountDetails;