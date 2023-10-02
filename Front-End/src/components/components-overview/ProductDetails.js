import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

const UserDetails = ({ userDetails }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={userDetails.avatar}
          alt={userDetails.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{userDetails.name}</h4>
                        
      <strong className="text-muted d-block mb-2">
            <p className="text-primary" style={{ fontSize: 45 }}>{userDetails.Price}</p>
      </strong>  
      <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">person_add</i> Follow
      </Button>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-4">        
        <strong className="text-muted d-block mb-2">
          {userDetails.metaTitle}
        </strong>
        <span>{userDetails.metaValue}</span>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object
};

UserDetails.defaultProps = {
  userDetails: {
    name: "Happy Dog - Profi Line High Energy 30-20",
    avatar: require("../../images/products/2.jpg"),
    jobTitle: "Meal",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Product Description",
    Price: "$5.68",
    metaValue:
      "PET Wash Tools Bath Massage Brush Soft Safety Silicone dog Cat Pet Cleaning bath Brush Pet Supplies"
  }
};

export default UserDetails;
// ProductImage: require("../../images/products/2.jpg"),
// author: "Chris Jamie",
// authorUrl: "#",
// ProductCategory: "Meal",
// categoryTheme: "primary",
// authorAvatar: require("../../images/avatars/1.jpg"),
// categoryUrl: "#",
// ProductName: "Happy Dog - Profi Line High Energy 30-20",
// ProductDescription:
//   "PET Wash Tools Bath Massage Brush Soft Safety Silicone dog Cat Pet Cleaning bath Brush Pet Supplies",
// Price: "$5.68",
// Stock: "18",
// PostedDate: "28 February 2019"