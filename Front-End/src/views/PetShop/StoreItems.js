/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";

class StoreItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListOne: []
    };
  }

  componentDidMount() {
    fetch(
      'https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/product/?PSID='+localStorage.getItem("UserTypeID")
    )
      .then(response => response.json())
      .then(productList => {
        this.setState({ PostsListOne: productList });
      });
  }

  DeleteProduct(ProductID) {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/product/" + ProductID, {
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
        alert("Product Remove From the Store");
        window.location.reload();
      })
      .catch(error => {
        console.error("Delete operation failed:", error);
      });
  }

  render() {
    const { PostsListOne } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Products"
            subtitle="Store"
            className="text-sm-left"
          />
        </Row>

        {/* Fourth Row of posts */}
        <Row>
          {PostsListOne.map((post, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.ProductImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.ProductCategory}
                  </Badge>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {post.ProductName}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">
                    {post.ProductDescription}
                  </p>
                  <Row>
                    <Col lg="6">
                      <span className="text-muted">{post.Stock} pieces</span>
                    </Col>
                    <Col lg="6">
                      {/* <span className="text-dark"> {post.PostedDate}</span> */}
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-muted border-top py-3">
                  <div className="row">
                    <div className="col-4">
                      <div className="my-auto ml-auto">
                        <Button
                          href={"/update-store-product?productID=" + post._id}
                          size="sm"
                          theme="primary"
                          className="mb-2"
                        >
                          <i className="far fa-bookmark mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="my-auto ml-auto">
                        <Button
                          onClick={() => this.DeleteProduct(post._id)}
                          size="sm"
                          theme="danger"
                          className="mb-2 mr-1"
                        >
                          <i className="far fa-trash-alt mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="col-4">
                      <p className="text-dark" style={{ fontSize: 25 }}>
                        {post.price}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default StoreItems;
