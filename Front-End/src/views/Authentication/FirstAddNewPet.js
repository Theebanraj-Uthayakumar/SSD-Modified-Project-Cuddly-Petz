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
import AddNewPetForm from "../../components/components-overview/AddNewPetForm";

const FirstAddNewPet = () => {

  return (
    <div className="container mt-2">
      <div className="container mt-5">
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <h3 className="text-center mb-4">Register Your Pets 🐶😸</h3>
            <Row>
              <AddNewPetForm />
            </Row>
            <Row className="mt-5" style={{ display: 'flex', justifyContent: 'center' }}>
              <Link to="/register">
                <Button theme="dark">
                  Create User Account
                </Button>
              </Link>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default FirstAddNewPet;
