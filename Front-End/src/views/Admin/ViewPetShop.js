import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { Link } from "react-router-dom";

class ViewPetShop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListFour: [],
      searchValue: ""
    };
  }

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petshop")
      .then(response => response.json())
      .then(petList => {
        this.setState({ PostsListFour: petList });
      });
  }

  handleSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    const { PostsListFour,  searchValue } = this.state;

    const deletePetShop = ID => {
      fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/petshop/${ID}`, { method: "DELETE" })
        .then(() => alert("Successfully removed...!"))
        .then(() => window.location.reload());
    };

    const updatePetShop = ID => {
      window.sessionStorage.setItem("PID", ID);
    };

    const filteredPosts = PostsListFour.filter(post => {
      return (
        post.ShopName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        post.Address.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        post.Telephone.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    });

    return (
      <Container fluid
      className="main-content-container px-4"
      style={{ height: "100vh", overflowY: "scroll" }}>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Pet Shops"
            subtitle="Admin"
            className="text-sm-left"
          />
        </Row>

        <div style={{ marginTop: "20px" }}>
          <Row>
            <Col>
              <InputGroup seamless className="mb-3">
                <InputGroupAddon type="prepend">
                  <InputGroupText>
                    <i className="material-icons">search</i>
                  </InputGroupText>
                </InputGroupAddon>
                <FormInput
                  placeholder="Search by Shop name, address, or telephone no"
                  value={searchValue}
                  onChange={this.handleSearch}
                />
              </InputGroup>
            </Col>
          </Row>
        </div>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Shop Details</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Shop Name
                      </th>
                      <th scope="col" className="border-0">
                        Address
                      </th>
                      <th scope="col" className="border-0">
                        Email
                      </th>
                      <th scope="col" className="border-0">
                        Telephone
                      </th>
                      <th scope="col" className="border-0">
                        Mobile
                      </th>
                      <th scope="col" className="border-0">
                        Open Hours
                      </th>
                      <th scope="col" className="border-0">
                        Close Hours
                      </th>
                      <th scope="col" className="border-0">
                        Location
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {filteredPosts.map((post, idx) => (
                    <tbody key={idx}>
                    <tr>
                      <td>{post.ShopName}</td>
                      <td>{post.Address}</td>
                      <td>{post.Email}</td>
                      <td>{post.Telephone}</td>
                      <td>{post.Mobile}</td>
                      <td>{post.OpenTime}</td>
                      <td>{post.CloseTime}</td>
                      {/* <td>{post.CloseTime}</td> */}
                      <td>
                          <Row form>
                            <Col md="12" className="mb-3">
                              <Button href={post.GoogleLocation}
                                theme="success"
                                link
                              >
                                View On Map
                              </Button>
                            </Col>
                          </Row>
                      </td>
                      <td>
                        <Row form>
                          <Col>
                          <Link to="/update-petshop">
                            <Button
                              theme="primary"
                              onClick={() => updatePetShop(post._id)}
                            >
                              Edit
                            </Button>
                            </Link>
                          </Col>
                          <Col>
                            <Button
                              theme="danger"
                              onClick={() => deletePetShop(post._id)}
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  </tbody>
                  ))}
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ViewPetShop;
