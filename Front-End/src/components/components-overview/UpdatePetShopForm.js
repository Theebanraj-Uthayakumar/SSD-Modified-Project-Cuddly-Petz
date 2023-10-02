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
  // FormSelect,
  Button
  // FormTextarea,
  // InputGroupText,
  // InputGroupAddon,
  // InputGroup
} from "shards-react";

const EditAppointmentForm = () => {
  const [shopname, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setGoogleLocation] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mobile, setMobile] = useState("");
  const [opentime, setOpenTime] = useState("");
  const [closetime, setCloseTime] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);

  const ID = window.sessionStorage.getItem("PID");

  useEffect(() => {
    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petshop/${ID}`)
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
  }, [ID]);

  const handleFormSubmit = e => {
    e.preventDefault();
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

    fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petshop/${ID}`, {
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
                  <label htmlFor="Date">Shop Name</label>
                  <FormInput
                    id="ShopName"
                    type="text"
                    value={shopname}
                    onChange={e => setShopName(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Date">Shop Address</label>
                  <FormInput
                    id="Address"
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Date">Google Location</label>
                  <FormInput
                    id="GoogleLocation"
                    type="url"
                    value={location}
                    onChange={e => setGoogleLocation(e.target.value)}
                  />
                </Col>

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

                <Col md="6" className="form-group">
                  <label htmlFor="Telephone">Tele No</label>
                  <FormInput
                    id="Telephone"
                    type="tel"
                    placeholder="Telephone No"
                    value={telephone}
                    onChange={e => setTelephone(e.target.value)}
                  />
                </Col>

                <Col md="6" className="form-group">
                  <label htmlFor="Mobile">Mobile No</label>
                  <FormInput
                    id="Mobile"
                    type="tel"
                    placeholder="Mobile No"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                  />
                </Col>

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

              <Button
                href="/add-new-user"
                type="submit"
                onClick={handleFormSubmit}
              >
                Update Pet Shop
              </Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
};

export default EditAppointmentForm;
