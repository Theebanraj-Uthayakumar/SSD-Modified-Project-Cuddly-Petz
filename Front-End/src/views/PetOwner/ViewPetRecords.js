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
  FormInput,
  FormSelect
} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { Link } from "react-router-dom";

class ViewPetRecord extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListFour: [],
      searchValue: "",
      filterValue: "All"
    };
  }

  componentDidMount() {
    fetch(
      "https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet-record/?POID="+localStorage.getItem("UserTypeID")
    )
      .then(response => response.json())
      .then(petList => {
        this.setState({ PostsListFour: petList });
        console.log(petList);
      });
  }

  handleSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleFilter = event => {
    this.setState({ filterValue: event.target.value });
  };

  render() {
    const { PostsListFour, searchValue, filterValue } = this.state;

    const deletePet = ID => {
      fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet-record/${ID}`, {
        method: "DELETE"
      })
        .then(() => alert("Successfully removed...!"))
        .then(() => window.location.reload());
    };

    const updatePet = ID => {
      window.sessionStorage.setItem("PID", ID);
    };

    const filteredPosts = PostsListFour.filter(post => {
      if (filterValue !== "All" && post.RecordType !== filterValue) {
        return false;
      }
      return (
        post.PetName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        post.RecordType.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    });

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Records"
            subtitle="Pet Owner"
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
                  placeholder="Search by pet name, record type"
                  value={searchValue}
                  onChange={this.handleSearch}
                />
              </InputGroup>
            </Col>
            <Col md="6">
              <FormSelect value={filterValue} onChange={this.handleFilter}>
                <option value="All">Filter by record type</option>
                <option value="Pet X-Ray Record">Pet X-Ray Record</option>
                <option value="Clinic Record">Clinic Record</option>
                <option value="Vaccination Record">Vaccination Record</option>
                <option value="Diary Record">Diary Record</option>
              </FormSelect>
            </Col>
          </Row>
        </div>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h4 className="m-0">Pet Records</h4>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Pet Name
                      </th>
                      <th scope="col" className="border-0">
                        Record Type
                      </th>
                      <th scope="col" className="border-0">
                        Note
                      </th>
                      <th scope="col" className="border-0">
                        File
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
                        <td>{post.PetName}</td>
                        <td>{post.RecordType}</td>
                        <td>{post.Note}</td>
                        <td>
                          <Row form>
                            <Col md="12" className="mb-3">
                              <Button  href={post.avatar} theme="success">View File</Button>
                            </Col>
                          </Row>
                        </td>
                        <td>
                          <Row form>
                            <Col md="4" className="mb-3">
                              <Link to="/user-update-pet-records">
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

export default ViewPetRecord;
