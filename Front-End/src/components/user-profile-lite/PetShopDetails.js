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

const PetShopDetails = () => {
  const [userDetails, setUserDetails] = useState({});

  const ID = localStorage.getItem("UserTypeID");

  useEffect(() => {
    axios
      .get(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petshop/${ID}`)
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
        <h4 className="mb-0" style={{ color: "black" }}>
          {userDetails.ShopName}
        </h4>
        <span className="text-muted d-block mb-2" style={{ color: "black" }}>
          {userDetails.Address}
        </span>
        {/* <Button pill outline size="sm" className="mb-2">
          <i className="material-icons mr-1">person_add</i> Follow
        </Button> */}
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="px-4">
          <div className="progress-wrapper">
            <strong className="text-muted d-block mb-2">
              Email No: {userDetails.Email}
            </strong>
            <strong className="text-muted d-block mb-2">
              Telephone: {userDetails.Telephone}
            </strong>
            <strong className="text-muted d-block mb-2">
              Mobile: {userDetails.Mobile}
            </strong>
            <strong className="text-muted d-block mb-2">
              OpenTime: {userDetails.OpenTime}
            </strong>
            <strong className="text-muted d-block mb-2">
              CloseTime: {userDetails.CloseTime}
            </strong>
            <strong className="text-muted d-block mb-2">
            GoogleLocation: <Button href={userDetails.GoogleLocation} theme="success" link>
                View On Map
              </Button>
            </strong>
          </div>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};

export default PetShopDetails;
