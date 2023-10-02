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

class UserViewHospital extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListFour: [],
      searchValue: ""
    };
  }

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pethospital")
      .then(response => response.json())
      .then(hospitalList => {
        this.setState({ PostsListFour: hospitalList });
      });
  }

  handleSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    const { PostsListFour, searchValue } = this.state;

    const deleteHospital = ID => {
      fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pethospital/${ID}`, {
        method: "DELETE"
      })
        .then(() => alert("Successfully removed...!"))
        .then(() => window.location.reload());
    };

    const updateHospital = ID => {
      window.sessionStorage.setItem("PID", ID);
    };

    // const handleViewMap = ID => {
    //   e.preventDefault();
    //   window.open(locationURL, "_blank");
    // };


    const filteredPosts = PostsListFour.filter(post => {
      return (
        post.HName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        post.HAddress.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        post.HWebsite.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    });

    return (
      <Container
        fluid
        className="main-content-container px-4"
        style={{ height: "100vh", overflowY: "scroll" }}
      >
        {/* Page Header */}

        
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Hospitals"
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
                  placeholder="Search by Hospital name, address, or website"
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
                <h6 className="m-0">Hospital Details</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Hospital Name
                      </th>
                      <th scope="col" className="border-0">
                        Address
                      </th>
                      <th scope="col" className="border-0">
                        Email
                      </th>
                      <th scope="col" className="border-0">
                        Web Site
                      </th>
                      <th scope="col" className="border-0">
                        Open Time
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
                        <td>{post.HName}</td>
                        <td>{post.HAddress}</td>
                        <td>{post.HEmailAddress}</td>
                        <td>{post.HWebsite}</td>
                        <td>{post.HOpenTime}</td>
                        <td>
                          <Row form>
                            <Col md="12" className="mb-3">
                              <Button href={post.HGoogleLocation}
                                theme="success"
                                link
                              >
                                View On Map
                              </Button>
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Row>
                            <Col>
                              <Link to="/update-hospital">
                                <Button
                                  theme="primary"
                                  onClick={() => updateHospital(post._id)}
                                >
                                  Edit
                                </Button>
                              </Link>
                            </Col>
                            <Col>
                              <Button
                                theme="danger"
                                onClick={() => deleteHospital(post._id)}
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

export default UserViewHospital;
