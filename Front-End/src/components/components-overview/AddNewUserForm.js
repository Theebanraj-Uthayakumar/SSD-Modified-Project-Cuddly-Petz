import React from "react";
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
  Button,  
  // FormTextarea,  
  // InputGroupText,
  // InputGroupAddon,
  // InputGroup
} from "shards-react";

const AddAppointmentForm = () => (
  <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
            <Row form>

              <Col md="12" className="form-group">
                <label htmlFor="name">Username</label>
                <FormInput
                  id="name"
                  type="text"
                />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="password">Password</label>
                <FormInput
                  id="password"
                  type="password"
                />
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <FormInput
                  id="password"
                  type="password"
                />
              </Col>

            </Row>

            <Button type="submit">Create Account</Button>
          </Form>
        </Col>
      </Row>
    </ListGroupItem>
  </ListGroup>
);

export default AddAppointmentForm;
