/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  // Container,
  // Row,
  Col,
  // Card,
  // CardBody,
  // CardFooter,
  // Badge,
  // Button,
  // FormSelect
} from "shards-react";

// import PageTitle from "../../components/common/PageTitle";
// import { NavLink as RouteNavLink } from "react-router-dom";
// import { NavItem, NavLink } from "shards-react";

class CartProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetails: [],
      ProductID : props.productID
    };
  }

  componentDidMount() {    
    const ProductID  = this.state.ProductID;
    fetch('https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/product/'+ ProductID)
    .then((response) => response.json())
    .then(productDetails => {
        this.setState({ productDetails: productDetails });
    });
  }

  render() {
    const {
        productDetails,
        ProductID
    } = this.state;

    return (
      <>
        <Col md="2">
          <div
            className="card-post__image"
            style={{ backgroundImage: `url(${productDetails.ProductImage})`, width: "100px", height: "100px" }}
          ></div>
        </Col>
        <Col md="4">
          <h5 className="card-title">{productDetails.ProductName}</h5>
          <p className="card-text text-muted">{productDetails.ProductDescription}</p>          
          <h5 className="card-title">$ {productDetails.Price}</h5>
        </Col>
      </>
    );
  }
}

export default CartProductDetails;
