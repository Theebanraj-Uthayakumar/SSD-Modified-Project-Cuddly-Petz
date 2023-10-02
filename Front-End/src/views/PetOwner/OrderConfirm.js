/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  // Badge,
  Button,
  FormSelect
} from "shards-react";

// import PageTitle from "../../components/common/PageTitle";
// import { NavLink as RouteNavLink } from "react-router-dom";
// import { NavItem, NavLink } from "shards-react";

// import PageTitle from "../../components/common/PageTitle";
// import { NavLink as RouteNavLink } from "react-router-dom";
// import { NavItem, NavLink } from "shards-react";
import CartProductDetails from "./CartProductDetails";
// import { withRouter  } from 'react-router-dom';

class OrderConfirm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListOne: [],
      TotalAmount: 0,
      PickUpMethod: "Pick-Up",
      PaymentMethod: "Cash"
    };
    this.SetPickUpMethod = this.SetPickUpMethod.bind(this);
    this.SetPaymentMethod = this.SetPaymentMethod.bind(this);
    this.ConfirmOrder = this.ConfirmOrder.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/cart/?PetOwnerID="+localStorage.getItem("UserTypeID")
    )
      .then(response => response.json())
      .then(cartList => {
        this.setState({ PostsListOne: cartList });
        this.CalculateTotal();
      });
  }

  CalculateTotal() {
    const { PostsListOne } = this.state;
    let Total = 0;

    PostsListOne.map((post, idx) => (Total = Total + parseFloat(post.Amount)));
    this.setState({ TotalAmount: Total.toFixed(2) });
  }

  SetPickUpMethod(event) {
    this.setState({ PickUpMethod: event.target.value });
  }

  SetPaymentMethod(event) {
    this.setState({ PaymentMethod: event.target.value });
  }

  ConfirmOrder() {
    const {
      PostsListOne,
      TotalAmount,
      PickUpMethod,
      PaymentMethod
    } = this.state;

    if (PostsListOne.length !== 0) {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      const data = {
        PetOwnerID:localStorage.getItem("UserTypeID"),
        PickupMethod: PickUpMethod,
        OrderDate: date,
        OrderTime: time,
        TotalAmount: TotalAmount,
        PaymentMethod: PaymentMethod,
        OrderStatus: "Pending"
      };

      fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          var lastInsertedID = data._id;
          PostsListOne.map((post) => {
            var productdata = {
              OrderID: lastInsertedID,
              ProductID: post.ProductID,
              Qty: post.Qty,
              Amount: post.Amount,
              Date: date,
              Time: time
            };

            fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/orderproduct", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(productdata)
            })
              .then(response => response.json())
              .then(data => {
                this.RemoveFromCart(post._id);
                console.log("Successfully Order Product Added");
              })
              .catch(error => {
                console.error("Error inserting product record:", error);
              });
          });

          alert("Successfully Order Placed");
          this.props.history.push("/user-orders");
        })
        .catch(error => {
          console.error("Error inserting record:", error);
        });
    } else {
      alert("Empty Cart. Please select some items from the store");
      this.props.history.push("/view-pet-store");
    }
  }

  RemoveFromCart(CartProductID) {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/cart/" + CartProductID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Product Remove From the Cart");
      })
      .catch(error => {
        console.error("Delete operation failed:", error);
      });
  }

  DeleteFromCart(CartProductID) {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/cart/" + CartProductID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        alert("Product Remove From the Cart");
        window.location.reload();
      })
      .catch(error => {
        console.error("Delete operation failed:", error);
      });
  }

  render() {
    const { PostsListOne, Products, TotalAmount } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        <div className="App pb-5">
          <section className="section-content padding-y bg">
            <div className="container pt-5">
              <article className="card">
                <div className="card-body">
                  <div className="row">
                    <main className="col-md-12">
                      <article>
                        <h3 className="title">My Order</h3>
                        <hr />

                        {PostsListOne.map((post, idx) => (
                          <Col lg="12" key={idx}>
                            <Card small className="card-post mb-4">
                              <CardBody>
                                <Row>
                                  <CartProductDetails
                                    productID={post.ProductID}
                                  />
                                  <Col md="2">
                                    <h5 className="card-title">x {post.Qty}</h5>
                                  </Col>
                                  <Col md="2">
                                    <h4 className="card-title text-dark">
                                      $ {post.Amount}
                                    </h4>
                                  </Col>
                                  <Col md="2">
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        this.DeleteFromCart(post._id)
                                      }
                                      theme="dark"
                                      className="mr-1"
                                    >
                                      X
                                    </Button>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        ))}

                        <Col lg="12">
                          <Card small className="card-post">
                            <CardBody>
                              <Row>
                                <Col md="8" className="mt-3">
                                  <p
                                    className="text-dark pl-4"
                                    style={{ fontSize: 30 }}
                                  >
                                    Total Bill
                                  </p>
                                </Col>
                                <Col md="2">
                                  <p
                                    className="text-dark"
                                    style={{ fontSize: 30 }}
                                  ></p>
                                </Col>
                                <Col md="2" className="mt-3">
                                  <p
                                    className="text-dark"
                                    style={{ fontSize: 30 }}
                                  >
                                    $ {TotalAmount}
                                  </p>
                                </Col>
                              </Row>
                              <Col md="12" className="mb-3">
                                <label htmlFor="PickupMethod">
                                  Order Collect Method
                                </label>
                                <FormSelect
                                  id="PickupMethod"
                                  value={this.state.PickUpMethod}
                                  onChange={this.SetPickUpMethod}
                                >
                                  <option value="Pick-Up">Pick Up</option>
                                  <option value="Delivery">Delivery</option>
                                </FormSelect>
                              </Col>
                              <Col md="12" className="mb-3">
                                <label htmlFor="PaymentMethod">
                                  Payment Method
                                </label>
                                <FormSelect
                                  id="PaymentMethod"
                                  value={this.state.PaymentMethod}
                                  onChange={this.SetPaymentMethod}
                                >
                                  <option value="Cash">Cash</option>
                                  <option value="Card">Card</option>
                                </FormSelect>
                              </Col>
                            </CardBody>
                            <CardFooter className="align-center">
                              <div className="mb-4">
                                <Button
                                  className="btn btn-primary mx-3"
                                  onClick={this.ConfirmOrder}
                                >
                                  Confirm Order
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </Col>
                      </article>
                    </main>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </Container>
    );
  }
}

export default OrderConfirm;
