import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Row
} from "shards-react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({});

  const ID = localStorage.getItem("UserTypeID");

  useEffect(() => {
    axios
      .get(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petowners/${ID}`)
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Card small className="mb-4 pt-3" style={{ margin: "0 auto" }}>
      <CardHeader className="border-bottom text-center">
        <div className="mb-3 mx-auto">
          <img
            className="rounded-circle"
            src={require("./../../images/avatars/0.jpg")}
            width="110"
          />
        </div>
        <h4 className="mb-0" style={{ color: "black" }}>{userDetails.OFirstName}</h4>
        <span className="text-muted d-block mb-2" style={{ color: "black" }}>{userDetails.OLastName}</span>
        {/* <Button pill outline size="sm" className="mb-2">
          <i className="material-icons mr-1">person_add</i> Follow
        </Button> */}
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="px-4">
          <div className="progress-wrapper">
            <strong className="text-muted d-block mb-2" >
              Phone No: {userDetails.PhoneNumber}
            </strong>
            <strong className="text-muted d-block mb-2">
              Address: {userDetails.Address}
            </strong>
            <strong className="text-muted d-block mb-2">
              Telephone: {userDetails.TelephoneNo}
            </strong>
            <strong className="text-muted d-block mb-2">
              Occupation: {userDetails.Occupation}
            </strong>
          </div>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default UserDetails;