import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  // FormFeedback,
  FormGroup,
  // FormCheckbox,
  //   FormSelect,
  Button
  //   FormTextarea
  // InputGroupText,
  // InputGroupAddon,
  // InputGroup
} from "shards-react";

const AddDoctorForm = () => (
  <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
            <Row form>
              <Col md="6" className="form-group">
                <label htmlFor="DFirstName">Owner First Name</label>
                <FormInput
                  id="DFirstName"
                  placeholder="First Name"
                  required
                  // valid
                  onChange={() => {}}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="DLastName">Owner Last Name</label>
                <FormInput
                  id="DLastName"
                  placeholder="Last Name"
                  required
                  // valid
                  onChange={() => {}}
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
                  onChange={() => {}}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="DEmailAddress">Email</label>
                <FormInput
                  id="DEmailAddress"
                  type="email"
                  placeholder="Email"
                  required
                  // valid
                  onChange={() => {}}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="feAddress">Address</label>
                <FormInput
                  id="feAddress"
                  placeholder="Address"
                  required
                  // valid
                  onChange={() => {}}
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
                  onChange={() => {}}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="DEmailAddress">Emergency Contact</label>
                <FormInput
                  id="DEmailAddress"
                  type="email"
                  placeholder="Emergency Contact"
                  required
                  // valid
                  onChange={() => {}}
                />
              </Col>
              <Col md="6" className="form-group">
                <FormGroup>
                  <label htmlFor="feAddress">Occupation</label>
                  <FormInput
                    id="feAddress"
                    placeholder="Occupation"
                    required
                    // valid
                    onChange={() => {}}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit">Add New Pet Owner</Button>
          </Form>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
);

export default AddDoctorForm;
