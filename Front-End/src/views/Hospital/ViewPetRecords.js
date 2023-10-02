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
  FormInput} from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";

class ViewPetRecords extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Fourth list of posts.
      PostsListFour: [],
      searchValue: ""
    };
  }

  componentDidMount() {
    fetch("https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet-record")
      .then(response => response.json())
      .then(petList => {
        this.setState({ PostsListFour: petList });
        console.log(petList);
      });
  }

  handleSearch = event => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    const { PostsListFour,  searchValue } = this.state;

    // const deletePet = ID => {
    //   fetch(`https://cuddly-petz-backend-be41f8744064.herokuapp.com/api/v1/pet-record/${ID}`, {
    //     method: "DELETE"
    //   })
    //     .then(() => alert("Successfully removed...!"))
    //     .then(() => window.location.reload());
    // };

    // const updatePet = ID => {
    //   window.sessionStorage.setItem("PID", ID);
    // };

    const filteredPosts = PostsListFour.filter(post => {
      return (
        post.PetName.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        post.RecordType.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    });

    console.log(PostsListFour);
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Pet 
            Records"
            subtitle="Pet Hospital"
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
                        Pet Owner
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
                    </tr>
                  </thead>
                  {filteredPosts.map((post, idx) => (
                    <tbody key={idx}>
                      <tr style={post.RecordType == 'Diary Record' ? {display : 'none'} : {display : ''}}>
                        <td>{idx + 1}</td>
                        <td>{post.PetOwnerID.OFirstName} {post.PetOwnerID.OLastName}</td>
                        <td>{post.PetName}</td>
                        <td>{post.RecordType}</td>
                        <td>{post.Note}</td>
                        <td>
                          <Row form>
                            <Col md="12" className="mb-3">
                              <Button href={post.avatar} theme="success">View File</Button>
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
export default ViewPetRecords;
