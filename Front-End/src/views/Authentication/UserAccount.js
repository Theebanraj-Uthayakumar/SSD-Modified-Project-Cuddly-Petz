import React from "react";
import {
  ListGroup,
  ListGroupItem,
  // Row,
  // Col,
  // Form,
  // FormInput,
  // FormGroup,
  //   FormSelect,
  // Button
  //   FormTextarea,
  //   InputGroupText,
  //   InputGroupAddon,
  //   InputGroup
} from "shards-react";

// import { Link } from "react-router-dom";
import AddNewUserForm from "../../components/components-overview/AddNewUserForm";

const UserAccount = () => (
  <div className="container mt-5">
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <AddNewUserForm/>
      </ListGroupItem>
    </ListGroup>
  </div>
);

export default UserAccount;
