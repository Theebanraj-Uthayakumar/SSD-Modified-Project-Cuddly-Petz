import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  // FormGroup,
  // FormCheckbox,
  FormSelect,
  Button
  // FormTextarea,
  // InputGroupText,
  // InputGroupAddon,
  // InputGroup
} from "shards-react";

const AddAppointmentForm = () => {
  const [hname, setHName] = useState("");
  const [haddress, setHAddress] = useState("");
  const [hphonenumber, setHPhoneNumber] = useState("");
  const [hemail, setHEmailAddress] = useState("");
  const [hwebsite, setHWebsite] = useState("");
  const [hopentime, setHOpenTime] = useState("");
  const [location, setHGoogleLocation] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);

  const ID = window.sessionStorage.getItem("PID");

  useEffect(() => {
    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pethospital/${ID}`)
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
  }, [ID]);

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

    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pethospital/${ID}`, {
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
        console.error("Error updating appointment record:", error);
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

              <Button
                href="/add-new-user"
                type="submit"
                onClick={handleFormSubmit}
              >
                Update Hospital
              </Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
};

export default AddAppointmentForm;
