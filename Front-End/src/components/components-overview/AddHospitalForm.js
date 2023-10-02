import React, { useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormSelect,
  Button
} from "shards-react";

const AddAppointmentForm = () => {
  const [hname, setHName] = useState("");
  const [haddress, setHAddress] = useState("");
  const [hphonenumber, setHPhoneNumber] = useState("");
  const [hemail, setHEmailAddress] = useState("");
  const [hwebsite, setHWebsite] = useState("");
  const [hopentime, setHOpenTime] = useState("");
  const [location, setHGoogleLocation] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState(true);
  // const [Users, setUsers] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);

  // useEffect(() => {
  //   fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/user")
  //     .then(response => response.json())
  //     .then(Users => {
  //       setUsers(Users);
  //     });
  // });

  const checkUsername = event => {
    event.preventDefault();
    // Users.map(({ name }) => {
    //   if (name === Username) {
    //     alert("Username Already Exist. Please enter a new Username");
    //     return;
    //   }
    // });
    setUsername(event.target.value);
  };

  const checkPassword = event => {
    event.preventDefault();
    if (Password === event.target.value) {
      setConfirmPassword(event.target.value);
      seterrorMessage(true);
    } else {
      seterrorMessage(false);
    }
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    const formData = {
      HName: hname,
      HAddress: haddress,
      HPhoneNumber: hphonenumber,
      HEmailAddress: hemail,
      HWebsite: hwebsite,
      HOpenTime: hopentime,
      HGoogleLocation: location
    };

    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pethospital", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert("Successfully added");

        const userformData = {
          name: Username,
          email: hemail,
          password: ConfirmPassword,
          UserTypeID: data._id,
          UserType: "PetHospital",
          date: "2022.02.15"
        };

        fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userformData)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert("Successfully user account created");
          })
          .catch(error => {
            console.error("Error inserting user record:", error);
          });
      })
      .catch(error => {
        console.error("Error inserting product record:", error);
      });
  };

  return (
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form onSubmit={handleFormSubmit}>
              <Row form>
                <Col md="6" className="form-group">
                  <label htmlFor="HName">Hospital Name</label>
                  <FormInput
                    id="HName"
                    value={hname}
                    onChange={e => setHName(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="HAddress">Hospital Address</label>
                  <FormInput
                    id="HAddress"
                    value={haddress}
                    onChange={e => setHAddress(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Date">Web Site</label>
                  <FormInput
                    id="HWebsite"
                    type="url"
                    value={hwebsite}
                    onChange={e => setHWebsite(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Date">Google Location</label>
                  <FormInput
                    id="HGoogleLocation"
                    type="url"
                    value={location}
                    onChange={e => setHGoogleLocation(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="HEmailAddress">Email</label>
                  <FormInput
                    id="HEmailAddress"
                    type="email"
                    placeholder="Email"
                    value={hemail}
                    onChange={e => setHEmailAddress(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="HPhoneNumber">Tele No</label>
                  <FormInput
                    id="HPhoneNumber"
                    type="tel"
                    placeholder="Telephone No"
                    value={hphonenumber}
                    onChange={e => setHPhoneNumber(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="OpenTime">Open Time</label>
                  <FormSelect
                    value={hopentime}
                    onChange={e => setHOpenTime(e.target.value)}
                  >
                    <option value="24 Hours">24 Hours</option>
                    <option value="12 Hours">12 Hours</option>
                  </FormSelect>
                </Col>

                {/* <Col md="6" className="form-group">
                  <label htmlFor="CloseTime">Close Time</label>
                  <FormInput id="HCloseTime" type="time" />
                </Col> */}
              </Row>
              <Row>
                <Col md="6" className="form-group mt-5">
                  <label htmlFor="CloseTime">Username</label>
                  <FormInput
                    id="Username"
                    type="text"
                    onChange={checkUsername}
                  />
                </Col>

                <Col md="6" className="form-group mt-5">
                  <label htmlFor="CloseTime">Password</label>
                  <FormInput
                    id="Password"
                    type="password"
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="CloseTime">Confirm Password</label>
                  {errorMessage ? (
                    <FormInput
                      id="ConfirmPassword"
                      valid
                      type="password"
                      onChange={checkPassword}
                    />
                  ) : (
                    <FormInput
                      invalid
                      id="ConfirmPassword"
                      type="password"
                      onChange={checkPassword}
                    />
                  )}
                </Col>
              </Row>

              <Button
                href="/add-new-user"
                type="submit"
                onClick={handleFormSubmit}
              >
                Add New Hospital
              </Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
};

export default AddAppointmentForm;
