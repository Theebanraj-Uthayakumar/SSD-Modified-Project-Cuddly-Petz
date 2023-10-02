import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  FormInput
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

class PetStoreItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListOne: [],
      filterCategory: "",
      searchQuery: "",
      dropdownOpen: false
    };
  }

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/product")
      .then(response => response.json())
      .then(productList => {
        this.setState({ PostsListOne: productList });
      });
  }

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  filterByCategory = category => {
    this.setState({ filterCategory: category });
  };

  handleSearchInputChange = event => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
  };

  render() {
    const { PostsListOne, filterCategory, searchQuery } = this.state;

    const filteredPostsList = PostsListOne.filter(
      post =>
        (filterCategory === "" || post.ProductCategory === filterCategory) &&
        post.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Col lg="10">
            <PageTitle
              sm="4"
              title="Products"
              subtitle="Store"
              className="text-sm-left"
            />
          </Col>

          <Col lg="2">
            <NavLink tag={RouteNavLink} to={"/order-confirm"}>
              <Button size="lg" theme="warning" className="float-end">
                <i className="far fa-edit mr-1" /> View Cart
              </Button>
            </NavLink>
          </Col>
        </Row>

        {/* Filter dropdown */}
        <Row className="mb-4">
          <Col lg="6">
            <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle caret>
                {filterCategory === ""
                  ? "Filter by category"
                  : `Filtering by ${filterCategory}`}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => this.filterByCategory("")}>
                  Show all
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => this.filterByCategory("Food")}>
                  Food
                </DropdownItem>
                <DropdownItem onClick={() => this.filterByCategory("Drink")}>
                  Drink
                </DropdownItem>
                <DropdownItem onClick={() => this.filterByCategory("Medicine")}>
                  Medicine
                </DropdownItem>
                <DropdownItem onClick={() => this.filterByCategory("Toy")}>
                  Toy
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col lg="6">
            <Form>
              <FormGroup>
                <FormInput
                  type="text"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={this.handleSearchInputChange}
                />
              </FormGroup>
            </Form>
          </Col>
        </Row>

        {/* Fourth Row of posts */}
        <Row>
          {filteredPostsList.map((post, idx) => (
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
                    <div className="col-8">
                      <p className="text-dark" style={{ fontSize: 25 }}>
                        $ {post.Price}
                      </p>
                    </div>
                    <div className="col-4">
                      <div className="my-auto ml-auto">
                        <NavLink
                          tag={RouteNavLink}
                          to={`/view-productdesc?productID=${post._id}`}
                        >
                          <Button size="sm" theme="warning" className="mb-2">
                            Buy
                          </Button>
                        </NavLink>
                      </div>
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

export default PetStoreItems;
