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

class ViewPets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      PostsListFour: [],
      searchValue: ""
    };
  }

  componentDidMount() {
    fetch(
      "https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet/?POID=" +
        localStorage.getItem("UserTypeID")
    )
      .then(response => response.json())
      .then(petList => {
        this.setState({ PostsListFour: petList });
      });
  }

  handleSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    const { PostsListFour, searchValue } = this.state;

    const deletePet = ID => {
      fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet/${ID}`, { method: "DELETE" })
        .then(() => alert("Successfully removed...!"))
        .then(() => window.location.reload());
    };

    const updatePet = ID => {
      window.sessionStorage.setItem("PID", ID);
    };

    const filteredPosts = PostsListFour.filter(post => {
      return (
        post.PetName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        post.SelectedType.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        post.SelectedBreed.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    });

    return (
      <Container
        fluid
        className="main-content-container px-4"
        style={{ height: "100vh", overflowY: "scroll" }}
      >
        {/* Page Header */}

        <div style={{ marginTop: "20px" }}>
          <Row>
            <Col>
              <InputGroup seamless className="mb-3" style={{ width: "50%" }}>
                <InputGroupAddon type="prepend">
                  <InputGroupText>
                    <i className="material-icons">search</i>
                  </InputGroupText>
                </InputGroupAddon>
                <FormInput
                  placeholder="Search by pet name, type, or breed"
                  value={searchValue}
                  onChange={this.handleSearch}
                />
              </InputGroup>
            </Col>
          </Row>
        </div>

        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Pets"
            subtitle="Pet Owner"
            className="text-sm-left"
          />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Details</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-10">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Avatar
                      </th>
                      <th scope="col" className="border-0">
                        Pet Name
                      </th>
                      <th scope="col" className="border-0">
                        Type
                      </th>
                      <th scope="col" className="border-0">
                        Breed
                      </th>
                      <th scope="col" className="border-0">
                        Age
                      </th>
                      <th scope="col" className="border-0">
                        Sex
                      </th>
                      <th scope="col" className="border-0">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {filteredPosts.map((post, idx) => (
                    <tbody key={idx}>
                      <tr>
                        <td>{idx + 1}</td>
                        <td>
                          <img
                            className="card-post__author-avatar card-post__author-avatar--small"
                            src={
                              post.SelectedType === "Dog"
                                ? require("./../../images/avatars/1009293.png")
                                : require("./../../images/avatars/1004919.png")
                            }
                            alt="A beautiful"
                          />
                          {post.avatar}
                        </td>
                        <td>{post.PetName}</td>
                        <td>{post.SelectedType}</td>
                        <td>{post.SelectedBreed}</td>
                        <td>{post.Age}</td>
                        <td>{post.Sex}</td>
                        <td>
                          <Row form>
                            <Col md="4" className="mb-3">
                              <Link to="/user-update-pets">
                                <Button
                                  // href={`/user-update-pets?petID=${post._id}`}
                                  class="btn btn-primary mr-1"
                                  theme="primary"
                                  onClick={() => updatePet(post._id)}
                                >
                                  Edit
                                </Button>
                              </Link>
                            </Col>
                            <Col md="4" className="mb-3">
                              <Button
                                theme="danger"
                                onClick={() => deletePet(post._id)}
                              >
                                Remove
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

export default ViewPets;
